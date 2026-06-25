import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchItems, createItem, removeItem, logout, checkStorage } from '../lib/instaCodesApi';

const AdminCMS = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [storageWarning, setStorageWarning] = useState('');

  const loadItems = useCallback(async () => {
    try {
      setItems(await fetchItems());
    } catch {
      setError('Failed to load items');
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
    checkStorage()
      .then((s) => { if (!s.configured) setStorageWarning(s.message); })
      .catch(() => {});
  }, [loadItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim() || !link.trim()) {
      setError('Title and link are required');
      return;
    }

    setSubmitting(true);
    try {
      await createItem({ title: title.trim(), link: link.trim(), description: description.trim() });
      await loadItems();
      setTitle('');
      setLink('');
      setDescription('');
      setSuccess('Added! Visible to everyone on /instaCodes');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await removeItem(id);
      await loadItems();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">InstaCodes Admin</h1>
          <div className="flex gap-3">
            <Link to="/instaCodes" className="text-sm text-blue-600 font-medium">View Wall →</Link>
            <button onClick={() => { logout(); navigate('/auth/abcdef/admin-login'); }} className="text-sm px-3 py-1.5 bg-gray-100 rounded-lg">Logout</button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {storageWarning && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-xl">
            {storageWarning}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-bold mb-4">Add Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Project" className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link *</label>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description..." rows={3} className="w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" />
              </div>
              {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">{error}</div>}
              {success && <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl">{success}</div>}
              <button type="submit" disabled={submitting} className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl">
                {submitting ? 'Adding...' : 'Add to Wall'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Items ({items.length})</h2>
            {loadingItems ? (
              <p className="text-gray-400">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-gray-400">No items yet.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-white border rounded-xl p-4 flex justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      {item.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>}
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 truncate block mt-1">{item.link}</a>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 shrink-0">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCMS;
