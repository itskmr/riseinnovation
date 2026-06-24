import { deleteItem } from '../lib/store.js';
import { verifyToken } from '../lib/auth.js';
import { getStorageError } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const storageError = getStorageError();
  if (storageError) {
    return res.status(503).json({ error: storageError });
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
    return res.status(500).json({ error: err.message || 'Failed to delete item' });
  }
}
