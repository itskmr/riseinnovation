import { verifyCredentials, createToken } from '../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!verifyCredentials(email, password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({ token: createToken() });
  } catch {
    return res.status(400).json({ error: 'Invalid request' });
  }
}
