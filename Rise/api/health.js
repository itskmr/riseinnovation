import { getStorageStatus, getStorageError } from '../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const backend = getStorageStatus();
  const error = getStorageError();

  return res.status(200).json({
    backend,
    configured: backend !== 'none',
    message: error || `Storage is configured (${backend})`,
  });
}
