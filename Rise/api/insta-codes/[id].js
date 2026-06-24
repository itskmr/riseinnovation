import { deleteItem } from '../lib/store.js';
import { verifyToken } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'Missing item id' });
    }

    await deleteItem(id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('DELETE /api/insta-codes error:', err);
    return res.status(500).json({ error: 'Failed to delete item' });
  }
}
