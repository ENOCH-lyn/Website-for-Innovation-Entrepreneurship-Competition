import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ADMIN_SECRET = process.env.ADMIN_SECRET || '1qaz@WSX';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const { newUserCount, newPageViews, secret } = req.body;
  if (secret !== ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid secret.' });
  }
  try {
    await redis.mset({
      userCount: Number(newUserCount) || 0,
      pageViews: Number(newPageViews) || 0,
    });
    res.status(200).json({ success: true, message: '统计数据已成功更新！' });
  } catch (error) {
    console.error('更新统计数据时出错:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}