import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    const pageViews = await redis.incr('pageViews');
    const userCount = await redis.get('userCount') || 0;
    res.status(200).json({
      userCount: Number(userCount),
      pageViews: pageViews,
    });
  } catch (error) {
    console.error('获取统计数据时出错:', error);
    res.status(500).json({ userCount: 0, pageViews: 0 });
  }
}