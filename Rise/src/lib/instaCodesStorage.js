const ITEMS_KEY = 'rise_insta_codes';
const AUTH_KEY = 'rise_admin_auth';

const ADMIN_EMAIL = 'roizlive69@gmail.com';
const ADMIN_PASSWORD = 'Abhay@2002#';

export function login(email, password) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'authenticated');
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
}

export function getItems() {
  try {
    const raw = localStorage.getItem(ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveItems(items) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

export function addItem(item) {
  const items = getItems();
  const newItem = {
    id: crypto.randomUUID(),
    title: item.title,
    link: item.link,
    description: item.description,
    image: item.image || '',
    createdAt: new Date().toISOString(),
  };
  items.unshift(newItem);
  saveItems(items);
  return newItem;
}

export function deleteItem(id) {
  const items = getItems().filter((item) => item.id !== id);
  saveItems(items);
}
