import { put, get } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN, BLOB_STORE_ID } from './config.js';

const BLOB_FILE = 'insta-codes/items.json';

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
  return !!(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function streamToText(stream) {
  return new Response(stream).text();
}

async function readBlobFresh() {
  ensureBlobEnv();
  const result = await get(BLOB_FILE, {
    access: 'private',
    useCache: false,
  });
  if (!result?.stream) return [];
  const data = JSON.parse(await streamToText(result.stream));
  return Array.isArray(data) ? data : [];
}

async function readBlobWithRetry(maxAttempts = 4) {
  let lastError;
  for (let i = 0; i < maxAttempts; i++) {
    try {
      return await readBlobFresh();
    } catch (err) {
      lastError = err;
      if (i < maxAttempts - 1) await sleep(150 * (i + 1));
    }
  }
  throw lastError || new Error('Failed to read items');
}

async function saveAllItems(items) {
  ensureBlobEnv();
  if (!hasBlobStorage()) {
    throw new Error('Blob store not connected. Redeploy after connecting Blob in Vercel Storage.');
  }

  await put(BLOB_FILE, JSON.stringify(items), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  });

  // Brief pause then verify write landed (avoids stale CDN reads)
  await sleep(200);
}

export async function getItems() {
  if (!hasBlobStorage()) return [];
  return readBlobWithRetry();
}

export async function addItem(item) {
  const newItem = {
    id: crypto.randomUUID(),
    title: item.title,
    link: item.link,
    description: item.description || '',
    createdAt: new Date().toISOString(),
  };

  let lastError;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const items = await readBlobWithRetry();
      items.unshift(newItem);
      await saveAllItems(items);

      const verified = await readBlobWithRetry();
      if (verified.some((i) => i.id === newItem.id)) {
        return { item: newItem, items: verified };
      }
    } catch (err) {
      lastError = err;
      await sleep(200 * (attempt + 1));
    }
  }

  throw lastError || new Error('Failed to save item. Please try once more.');
}

export async function deleteItem(id) {
  const items = (await readBlobWithRetry()).filter((i) => i.id !== id);
  await saveAllItems(items);
  return readBlobWithRetry();
}

export function isStorageReady() {
  return hasBlobStorage();
}
