import { getItems, addItem } from '../lib/store.js';
import { verifyToken } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const items = await getItems();
      return res.status(200).json(items);
    } catch (err) {
      console.error('GET /api/insta-codes error:', err);
      return res.status(500).json({ error: 'Failed to fetch items' });
    }
  }

  if (req.method === 'POST') {
    if (!verifyToken(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const body = req.body;

      if (!body.title?.trim() || !body.link?.trim()) {
        return res.status(400).json({ error: 'Title and link are required' });
      }

      const item = await addItem({
        title: body.title.trim(),
        link: body.link.trim(),
        description: body.description?.trim() || '',
        image: body.image?.trim() || '',
      });

      return res.status(201).json(item);
    } catch (err) {
      console.error('POST /api/insta-codes error:', err);
      return res.status(500).json({ error: 'Failed to add item' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
