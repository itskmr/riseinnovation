import { put, list, get } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { BLOB_READ_WRITE_TOKEN, BLOB_STORE_ID } from './config.js';

const BLOB_FILE = 'insta-codes/items.json';
const LOCAL_FILE = path.join(process.cwd(), 'public/data/items.json');

function ensureBlobEnv() {
  if (BLOB_READ_WRITE_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN) {
    process.env.BLOB_READ_WRITE_TOKEN = BLOB_READ_WRITE_TOKEN;
  }
  if (BLOB_STORE_ID && !process.env.BLOB_STORE_ID) {
    process.env.BLOB_STORE_ID = BLOB_STORE_ID;
  }
}

export function hasBlobStorage() {
  ensureBlobEnv();
  return !!(
    process.env.BLOB_STORE_ID ||
    process.env.BLOB_READ_WRITE_TOKEN
  );
}

async function streamToText(stream) {
  return new Response(stream).text();
}

async function readBlob() {
  ensureBlobEnv();
  try {
    const result = await get(BLOB_FILE, { access: 'private' });
    if (result?.stream) {
      return JSON.parse(await streamToText(result.stream));
    }
  } catch {
    // file may not exist yet
  }

  try {
    const { blobs } = await list({ prefix: 'insta-codes/', limit: 20 });
    const target = blobs.find((b) => b.pathname === BLOB_FILE);
    if (target) {
      const result = await get(target.pathname, { access: 'private' });
      if (result?.stream) {
        return JSON.parse(await streamToText(result.stream));
      }
    }
  } catch {
    // ignore
  }

  return null;
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

async function getAllItems() {
  if (hasBlobStorage()) {
    const blobItems = await readBlob();
    if (blobItems && Array.isArray(blobItems)) return blobItems;
  }
  return readLocal();
}

async function saveAllItems(items) {
  ensureBlobEnv();
  if (!hasBlobStorage()) {
    throw new Error(
      'Blob store not connected. Vercel → Storage → connect Blob to this project → Redeploy.'
    );
  }

  await put(BLOB_FILE, JSON.stringify(items), {
    access: 'private',
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
  return hasBlobStorage();
}
