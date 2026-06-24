import { verifyToken } from '../lib/auth.js';
import { getItems, addItem, isStorageReady } from '../lib/store.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      return res.status(200).json(await getItems());
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    if (!verifyToken(req.headers.authorization)) {
      return res.status(401).json({ error: 'Please log in again' });
    }
    if (!isStorageReady()) {
      return res.status(503).json({
        error: 'Storage not ready. Vercel → Storage → Create Blob store → Connect → Redeploy.',
      });
    }

    try {
      const { title, link, description } = req.body || {};
      if (!title?.trim() || !link?.trim()) {
        return res.status(400).json({ error: 'Title and link are required' });
      }
      const item = await addItem({
        title: title.trim(),
        link: link.trim(),
        description: description?.trim() || '',
      });
      return res.status(201).json(item);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
