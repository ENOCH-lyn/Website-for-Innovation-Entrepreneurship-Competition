import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

// 注意：只读，不自增 pageViews
export default async function handler(req, res) {
  try {
    const userCount = await redis.get('userCount');
    const pageViews = await redis.get('pageViews');
    res.status(200).json({
      userCount: Number(userCount || 0),
      pageViews: Number(pageViews || 0),
    });
  } catch (e) {
    console.error('getStats error:', e);
    res.status(500).json({ userCount: 0, pageViews: 0 });
  }
}
