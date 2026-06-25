import { verifyToken } from '../lib/auth.js';
import { getItems, addItem } from '../lib/store.js';

function setNoCache(res) {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
}

export default async function handler(req, res) {
  setNoCache(res);

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

    try {
      const { title, link, description } = req.body || {};
      if (!title?.trim() || !link?.trim()) {
        return res.status(400).json({ error: 'Title and link are required' });
      }
      const result = await addItem({
        title: title.trim(),
        link: link.trim(),
        description: description?.trim() || '',
      });
      return res.status(201).json(result);
    } catch (err) {
      console.error('POST /api/insta-codes error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
