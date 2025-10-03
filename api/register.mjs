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
  const { username, email, password } = req.body || {};

  // 基础校验
  const usernameTrimmed = (username || '').trim();
  const emailTrimmed = (email || '').trim();
  const passwordStr = password || '';

  const usernameLower = usernameTrimmed.toLowerCase();
  const emailLower = emailTrimmed.toLowerCase();

  const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(usernameTrimmed);
  const emailOk = /.+@.+\..+/.test(emailTrimmed);
  const passwordOk = passwordStr.length >= 6;

  if (!usernameOk || !emailOk || !passwordOk) {
    return res.status(400).json({ error: '用户名/邮箱/密码不合法（用户名3-20位字母数字下划线，密码至少6位）。' });
  }
  try {
    // 唯一性检查（邮箱、用户名）
    const emailKey = `user:email:${emailLower}`;
    const usernameKey = `user:username:${usernameLower}`;

    const [existingByEmail, existingByUsername] = await Promise.all([
      redis.get(emailKey),
      redis.get(usernameKey),
    ]);

    if (existingByEmail) {
      return res.status(409).json({ error: '该邮箱已被注册。' });
    }
    if (existingByUsername) {
      return res.status(409).json({ error: '该用户名已被占用。' });
    }

    // 生成递增编号与密码哈希
    const userCount = await redis.incr('userCount');
    const passwordHash = await bcrypt.hash(passwordStr, 10);
    const userData = {
      username: usernameTrimmed,
      email: emailLower,
      passwordHash,
      createdAt: new Date().toISOString(),
      registrationNumber: userCount,
    };
    await redis.set(emailKey, JSON.stringify(userData));
    // 用户名 -> 邮箱 的指针，避免重复存储
    await redis.set(usernameKey, emailLower);
    console.log(`新用户注册成功: ${usernameTrimmed} <${emailLower}>, 是第 ${userCount} 位用户。`);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      username: usernameTrimmed,
      email: emailLower,
      registrationNumber: userCount,
    });
  } catch (error) {
    console.error('注册逻辑内部错误:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}