import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ADMIN_SECRET = process.env.ADMIN_SECRET || '1qaz@WSX';

export default async function handler(req, res) {
  const secret = req.query?.secret || req.headers['x-admin-secret'] || req.body?.secret;
  if (secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... 后续逻辑完全不变 ...
  try {
    const userEmailKeys = [];
    let cursor = 0;
    do {
      const [nextCursor, keys] = await redis.scan(cursor, { match: 'user:email:*', count: 200 });
      userEmailKeys.push(...keys);
      cursor = Number(nextCursor) || 0;
    } while (cursor !== 0);

    if (userEmailKeys.length === 0) {
      return res.status(200).json([]);
    }
    const usersData = await redis.mget(...userEmailKeys);
    const users = usersData
      .filter(Boolean)
      .map(u => {
        const obj = (typeof u === 'string') ? (() => { try { return JSON.parse(u); } catch { return null; } })() : u;
        if (obj && obj.passwordHash) obj.passwordHash = '***';
        return obj;
      })
      .filter(Boolean);
    res.status(200).json(users);
  } catch (error) {
    console.error('获取用户列表时出错:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}