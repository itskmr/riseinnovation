const AUTH_KEY = 'rise_admin_token';

function getToken() {
  return sessionStorage.getItem(AUTH_KEY);
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export async function login(email, password) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(res);
  sessionStorage.setItem(AUTH_KEY, data.token);
  return true;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export async function fetchItems() {
  const res = await fetch('/api/insta-codes');
  return handleResponse(res);
}

export async function createItem(item) {
  const res = await fetch('/api/insta-codes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(item),
  });
  return handleResponse(res);
}

export async function removeItem(id) {
  const res = await fetch(`/api/insta-codes/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function uploadImage(file) {
  const { upload } = await import('@vercel/blob/client');

  const blob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
    headers: authHeaders(),
  });

  return blob.url;
}

export { getToken };
