import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';

const BLOB_PATH = 'insta-codes/items.json';
const LOCAL_PATH = path.join(process.cwd(), 'data', 'items.json');

function useLocalStore() {
  return !process.env.BLOB_READ_WRITE_TOKEN;
}

function readLocal() {
  try {
    fs.mkdirSync(path.dirname(LOCAL_PATH), { recursive: true });
    if (!fs.existsSync(LOCAL_PATH)) {
      fs.writeFileSync(LOCAL_PATH, '[]');
      return [];
    }
    return JSON.parse(fs.readFileSync(LOCAL_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function writeLocal(items) {
  fs.mkdirSync(path.dirname(LOCAL_PATH), { recursive: true });
  fs.writeFileSync(LOCAL_PATH, JSON.stringify(items, null, 2));
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

export async function getItems() {
  if (useLocalStore()) return readLocal();
  return readBlob();
}

export async function saveItems(items) {
  if (useLocalStore()) {
    if (process.env.VERCEL) {
      throw new Error(
        'Storage not configured. Enable Vercel Blob in your project dashboard (Storage → Blob).'
      );
    }
    writeLocal(items);
    return;
  }
  await writeBlob(items);
}

export async function addItem(item) {
  const items = await getItems();
  const newItem = {
    id: crypto.randomUUID(),
    title: item.title,
    link: item.link,
    description: item.description || '',
    image: item.image || '',
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  await saveItems(items);
  return newItem;
}

export async function deleteItem(id) {
  const items = (await getItems()).filter((item) => item.id !== id);
  await saveItems(items);
}
