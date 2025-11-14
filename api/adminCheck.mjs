export default async function handler(req, res) {
  try {
    const secret = req.query?.secret || req.headers['x-admin-secret'] || req.body?.secret;
    if (!secret) return res.status(400).json({ ok: false, error: 'Missing admin secret' });
    const ok = secret === process.env.ADMIN_SECRET;
    if (!ok) return res.status(401).json({ ok: false, error: 'Invalid admin secret' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('adminCheck error:', err);
    return res.status(500).json({ ok: false, error: 'Internal error' });
  }
}
