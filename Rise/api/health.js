import { isStorageReady } from '../lib/store.js';

export default async function handler(req, res) {
  return res.status(200).json({
    configured: isStorageReady(),
    message: isStorageReady()
      ? 'Ready'
      : 'Enable Vercel Blob: Storage → Create Blob → Connect → Redeploy',
  });
}
