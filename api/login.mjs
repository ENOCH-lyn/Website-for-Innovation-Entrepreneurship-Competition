import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { identifier, password } = req.body || {};
  const idTrimmed = (identifier || '').trim();
  const passwordStr = password || '';

  if (!idTrimmed || !passwordStr) {
    return res.status(400).json({ error: '请输入用户名或邮箱以及密码。' });
  }

  try {
    // 允许用户名或邮箱登录：
    const isEmail = idTrimmed.includes('@');
    let emailKey;
    if (isEmail) {
      emailKey = `user:email:${idTrimmed.toLowerCase()}`;
    } else {
      // 根据用户名找到邮箱，再定位用户文档
      const usernameKey = `user:username:${idTrimmed.toLowerCase()}`;
      const mappedEmail = await redis.get(usernameKey);
      if (!mappedEmail) {
        return res.status(404).json({ error: '用户不存在。' });
      }
      emailKey = `user:email:${mappedEmail}`;
    }

    const userRaw = await redis.get(emailKey);
    if (!userRaw) {
      return res.status(404).json({ error: '用户不存在。' });
    }

    const userData = (typeof userRaw === 'string') ? (() => { try { return JSON.parse(userRaw); } catch { return null; } })() : userRaw;
    if (!userData || typeof userData !== 'object') {
      return res.status(500).json({ error: '用户数据格式异常。' });
    }
    const ok = await bcrypt.compare(passwordStr, userData.passwordHash || '');
    if (!ok) {
      return res.status(401).json({ error: '密码错误。' });
    }

    console.log(`用户 ${userData.username} <${userData.email}> 登录成功。`);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      username: userData.username,
      email: userData.email,
    });

  } catch (error) {
    console.error('登录逻辑内部错误:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}