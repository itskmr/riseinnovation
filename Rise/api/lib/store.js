import { put, list } from '@vercel/blob';
import { kv } from '@vercel/kv';
import { getSupabase, getStorageStatus } from './supabase.js';

const BLOB_PATH = 'insta-codes/items.json';
const KV_KEY = 'insta-codes:items';

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    link: row.link,
    description: row.description || '',
    image: row.image || '',
    createdAt: row.created_at || row.createdAt,
  };
}

async function getItemsFromSupabase() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('insta_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []).map(mapRow);
}

async function addItemToSupabase(item) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('insta_codes')
    .insert({
      title: item.title,
      link: item.link,
      description: item.description || '',
      image: item.image || '',
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

async function deleteItemFromSupabase(id) {
  const supabase = getSupabase();
  const { error } = await supabase.from('insta_codes').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

async function readBlob() {
  const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
  const target = blobs.find((b) => b.pathname === BLOB_PATH);
  if (!target) return [];
  const res = await fetch(target.url);
  if (!res.ok) return [];
  return res.json();
}

async function writeBlob(items) {
  await put(BLOB_PATH, JSON.stringify(items), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

async function getItemsFromKv() {
  const items = await kv.get(KV_KEY);
  return items || [];
}

async function saveItemsToKv(items) {
  await kv.set(KV_KEY, items);
}

function assertStorageConfigured() {
  if (getStorageStatus() === 'none') {
    throw new Error(
      'Storage not configured. Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in Vercel env vars, or enable Vercel Blob/KV in Storage tab.'
    );
  }
}

export async function getItems() {
  const backend = getStorageStatus();
  if (backend === 'supabase') return getItemsFromSupabase();
  if (backend === 'blob') return readBlob();
  if (backend === 'kv') return getItemsFromKv();
  return [];
}

export async function addItem(item) {
  assertStorageConfigured();
  const backend = getStorageStatus();

  if (backend === 'supabase') {
    return addItemToSupabase(item);
  }

  const newItem = {
    id: crypto.randomUUID(),
    title: item.title,
    link: item.link,
    description: item.description || '',
    image: item.image || '',
    createdAt: new Date().toISOString(),
  };

  if (backend === 'blob') {
    const items = await readBlob();
    items.unshift(newItem);
    await writeBlob(items);
    return newItem;
  }

  if (backend === 'kv') {
    const items = await getItemsFromKv();
    items.unshift(newItem);
    await saveItemsToKv(items);
    return newItem;
  }

  throw new Error('Storage not configured');
}

export async function deleteItem(id) {
  assertStorageConfigured();
  const backend = getStorageStatus();

  if (backend === 'supabase') {
    return deleteItemFromSupabase(id);
  }

  if (backend === 'blob') {
    const items = (await readBlob()).filter((item) => item.id !== id);
    await writeBlob(items);
    return;
  }

  if (backend === 'kv') {
    const items = (await getItemsFromKv()).filter((item) => item.id !== id);
    await saveItemsToKv(items);
  }
}
