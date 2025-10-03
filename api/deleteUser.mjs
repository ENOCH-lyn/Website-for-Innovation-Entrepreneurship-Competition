import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ADMIN_SECRET = process.env.ADMIN_SECRET || '1qaz@WSX';

function toObj(v) {
  if (!v) return null;
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return null; }
  }
  return v;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const secret = req.query?.secret || req.headers['x-admin-secret'] || req.body?.secret;
    if (secret !== ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const rawUsername = (req.query?.username || req.body?.username || '').trim();
    const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(rawUsername);
    if (!usernameOk) {
      return res.status(400).json({ error: '用户名不合法（3-20位字母数字下划线）。' });
    }
    const usernameLower = rawUsername.toLowerCase();
    const usernameKey = `user:username:${usernameLower}`;

    const mapped = await redis.get(usernameKey);
    if (!mapped) {
      return res.status(404).json({ error: '用户不存在。' });
    }

    // 兼容 mapped 既可能是字符串邮箱，也可能是对象
    const mappedEmail = typeof mapped === 'string' ? mapped : (mapped.email || '');
    const emailLower = (mappedEmail || '').toLowerCase();
    const emailKey = emailLower ? `user:email:${emailLower}` : null;

    let userBefore = null;
    if (emailKey) {
      const raw = await redis.get(emailKey);
      userBefore = toObj(raw) || null;
    }

    // 删除用户名映射与用户对象
    let deleted = 0;
    if (emailKey) {
      const count = await redis.del(usernameKey, emailKey);
      deleted += Number(count || 0);
    } else {
      const count = await redis.del(usernameKey);
      deleted += Number(count || 0);
    }

    return res.status(200).json({
      success: true,
      deleted,
      username: rawUsername,
      email: emailLower || null,
      user: userBefore ? { username: userBefore.username, email: userBefore.email, registrationNumber: userBefore.registrationNumber } : null,
      message: '用户删除完成',
    });
  } catch (err) {
    console.error('删除用户时出错:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
