import { createClient } from '@supabase/supabase-js';

let client = null;

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export function getStorageStatus() {
  if (getSupabase()) return 'supabase';
  if (process.env.BLOB_READ_WRITE_TOKEN) return 'blob';
  if (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) return 'kv';
  return 'none';
}

export function getStorageError() {
  if (getStorageStatus() !== 'none') return null;
  return 'Storage not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Vercel env vars (see supabase/schema.sql), or enable Vercel Blob/KV in your project Storage tab.';
}
