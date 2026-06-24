import { put } from '@vercel/blob';
import { getSupabase, getStorageStatus } from '../lib/supabase.js';
import { verifyToken } from '../lib/auth.js';

const MAX_SIZE = 10 * 1024 * 1024;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized — please log in again' });
  }

  try {
    const { filename, contentType, fileBase64 } = req.body || {};

    if (!filename) {
      return res.status(400).json({ error: 'filename is required' });
    }

    const backend = getStorageStatus();

    // Supabase: return signed upload URL so client uploads directly (supports 10MB+)
    if (backend === 'supabase') {
      const supabase = getSupabase();
      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `uploads/${Date.now()}-${safeName}`;

      const { data, error } = await supabase.storage
        .from('insta-images')
        .createSignedUploadUrl(path);

      if (error) {
        return res.status(500).json({
          error: `Supabase upload error: ${error.message}. Make sure the "insta-images" bucket exists and is public.`,
        });
      }

      const { data: publicData } = supabase.storage.from('insta-images').getPublicUrl(path);

      return res.status(200).json({
        method: 'signed',
        signedUrl: data.signedUrl,
        token: data.token,
        publicUrl: publicData.publicUrl,
        contentType: contentType || 'application/octet-stream',
      });
    }

    // Vercel Blob: accept base64 upload via server (up to ~4MB effective)
    if (backend === 'blob') {
      if (!fileBase64) {
        return res.status(400).json({ error: 'fileBase64 is required for blob upload' });
      }

      const buffer = Buffer.from(fileBase64, 'base64');
      if (buffer.length > MAX_SIZE) {
        return res.status(400).json({ error: 'Image must be under 10MB' });
      }

      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const blob = await put(`insta-codes/${Date.now()}-${safeName}`, buffer, {
        access: 'public',
        contentType: contentType || 'application/octet-stream',
      });

      return res.status(200).json({ method: 'direct', url: blob.url });
    }

    return res.status(503).json({
      error: 'Image storage not configured. Set up Supabase (recommended) or enable Vercel Blob in your project Storage tab.',
    });
  } catch (err) {
    console.error('POST /api/upload error:', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '12mb',
    },
  },
};
