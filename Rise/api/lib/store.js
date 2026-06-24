import { put, list } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { BLOB_READ_WRITE_TOKEN } from './config.js';

const BLOB_FILE = 'insta-codes/items.json';
const LOCAL_FILE = path.join(process.cwd(), 'public/data/items.json');

if (BLOB_READ_WRITE_TOKEN) {
  process.env.BLOB_READ_WRITE_TOKEN = BLOB_READ_WRITE_TOKEN;
}

function readLocal() {
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      return JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf8'));
    }
  } catch {
    // ignore
  }
  return [];
}

async function readBlob() {
  const { blobs } = await list({ prefix: BLOB_FILE, limit: 1 });
  const target = blobs.find((b) => b.pathname === BLOB_FILE);
  if (!target) return null;
  const res = await fetch(target.url);
  if (!res.ok) return null;
  return res.json();
}

async function getAllItems() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blobItems = await readBlob();
    if (blobItems) return blobItems;
  }
  return readLocal();
}

async function saveAllItems(items) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      'Storage not ready. In Vercel → your project → Storage → Create Blob store → Connect → Redeploy.'
    );
  }
  await put(BLOB_FILE, JSON.stringify(items), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function getItems() {
  return getAllItems();
}

export async function addItem(item) {
  const items = await getAllItems();
  const newItem = {
    id: crypto.randomUUID(),
    title: item.title,
    link: item.link,
    description: item.description || '',
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  await saveAllItems(items);
  return newItem;
}

export async function deleteItem(id) {
  const items = (await getAllItems()).filter((i) => i.id !== id);
  await saveAllItems(items);
}

export function isStorageReady() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}
