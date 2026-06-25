import { BLOB_STORE_ID } from './config.js';

export default async function handler(req, res) {
  const storeId = process.env.BLOB_STORE_ID || BLOB_STORE_ID || '';
  const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
  const ready = !!(storeId || hasToken);

  return res.status(200).json({
    configured: ready,
    auth: hasToken ? 'read-write-token' : storeId ? 'oidc' : 'none',
    message: ready ? 'Storage ready' : 'Connect Blob store and redeploy',
  });
}
