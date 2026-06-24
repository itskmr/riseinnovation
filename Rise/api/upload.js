import { handleUpload } from '@vercel/blob/client';
import { verifyToken } from '../lib/auth.js';

export async function POST(request) {
  const authHeader = request.headers.get('authorization');
  if (!verifyToken(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'image/jpeg',
          'image/png',
          'image/webp',
          'image/gif',
          'image/svg+xml',
        ],
        maximumSizeInBytes: 10 * 1024 * 1024,
      }),
    });

    return Response.json(jsonResponse);
  } catch (err) {
    console.error('POST /api/upload error:', err);
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}
