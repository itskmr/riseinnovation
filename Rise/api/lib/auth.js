import crypto from 'crypto';
import { ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET } from './config.js';

export function verifyCredentials(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function createToken() {
  const payload = { admin: true, exp: Date.now() + 24 * 60 * 60 * 1000 };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return false;
  const token = authHeader.slice(7);
  const dot = token.indexOf('.');
  if (dot === -1) return false;

  const data = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
  if (sig !== expected) return false;

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    return payload.admin === true && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function requireAuth(request) {
  const authHeader = request.headers.get('authorization');
  if (!verifyToken(authHeader)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
