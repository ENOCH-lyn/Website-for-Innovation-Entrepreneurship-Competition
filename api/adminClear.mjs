import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ADMIN_SECRET = process.env.ADMIN_SECRET || '1qaz@WSX';

async function scanKeys(matchPattern) {
  const keys = [];
  let cursor = 0;
  do {
    const [nextCursor, batch] = await redis.scan(cursor, { match: matchPattern, count: 200 });
    keys.push(...batch);
    cursor = Number(nextCursor) || 0;
  } while (cursor !== 0);
  return keys;
}

async function deleteKeys(keys) {
  if (!keys.length) return 0;
  let deleted = 0;
  const chunkSize = 100;
  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunk = keys.slice(i, i + chunkSize);
    // Upstash 支持多 key 删除
    const count = await redis.del(...chunk);
    deleted += Number(count || 0);
  }
  return deleted;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const secret = req.query?.secret || req.headers['x-admin-secret'] || req.body?.secret;
    if (!secret || secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const scope = (req.body?.scope || req.query?.scope || 'all').toLowerCase();
    const confirm = req.body?.confirm || req.query?.confirm;
    if (confirm !== 'YES') {
      return res.status(400).json({ error: "危险操作：请提供 confirm=YES 以确认清空。" });
    }

    let keysToDelete = [];
    if (scope === 'users') {
      const emailKeys = await scanKeys('user:email:*');
      const usernameKeys = await scanKeys('user:username:*');
      keysToDelete = [...emailKeys, ...usernameKeys, 'userCount'];
    } else if (scope === 'stats') {
      keysToDelete = ['pageViews'];
    } else if (scope === 'all') {
      // 全量删除（谨慎）
      keysToDelete = await scanKeys('*');
    } else {
      return res.status(400).json({ error: '未知的 scope（可选：all | users | stats）' });
    }

    const uniqueKeys = Array.from(new Set(keysToDelete)).filter(Boolean);
    const total = await deleteKeys(uniqueKeys);

    return res.status(200).json({
      success: true,
      scope,
      deleted: total,
      keysProcessed: uniqueKeys.length,
    });
  } catch (error) {
    console.error('清空数据库出错:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
