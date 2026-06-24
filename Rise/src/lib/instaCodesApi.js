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
    throw new Error(data.error || `Request failed (${res.status})`);
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

export async function checkStorage() {
  const res = await fetch('/api/health');
  return handleResponse(res);
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

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function uploadImage(file) {
  const MAX_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Image must be under 10MB');
  }

  const { backend } = await checkStorage();

  if (backend === 'supabase') {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    const data = await handleResponse(res);

    const uploadRes = await fetch(data.signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': data.contentType,
        'x-upsert': 'true',
        ...(data.token ? { Authorization: `Bearer ${data.token}` } : {}),
      },
      body: file,
    });

    if (!uploadRes.ok) {
      throw new Error('Failed to upload image to storage');
    }

    return data.publicUrl;
  }

  if (backend === 'blob') {
    const fileBase64 = await fileToBase64(file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
        fileBase64,
      }),
    });

    const data = await handleResponse(res);
    return data.url;
  }

  throw new Error(
    'Image storage not configured. Set up Supabase or enable Vercel Blob in your project Storage tab.'
  );
}

export { getToken };
