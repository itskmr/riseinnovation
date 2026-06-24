import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchItems,
  createItem,
  removeItem,
  uploadImage,
  logout,
  checkStorage,
} from '../lib/instaCodesApi';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const AdminCMS = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [storageWarning, setStorageWarning] = useState('');

  const loadItems = useCallback(async () => {
    try {
      const data = await fetchItems();
      setItems(data);
    } catch {
      setError('Failed to load items');
    } finally {
      setLoadingItems(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
    checkStorage()
      .then((status) => {
        if (!status.configured) {
          setStorageWarning(status.message);
        }
      })
      .catch(() => {});
  }, [loadItems]);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError('Image must be under 10MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);

      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      setError(err.message || 'Failed to upload image. Please try again or use an image URL.');
      setImagePreview('');
      setImageUrl('');
    } finally {
      setUploading(false);
    }
  };

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
      await createItem({
        title: title.trim(),
        link: link.trim(),
        description: description.trim(),
        image: imageUrl,
      });

      await loadItems();
      setTitle('');
      setLink('');
      setDescription('');
      setImageUrl('');
      setImagePreview('');
      setSuccess('Item added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to add item');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;

    try {
      await removeItem(id);
      await loadItems();
    } catch {
      setError('Failed to delete item');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/abcdef/admin-login');
  };

  const clearImage = () => {
    setImagePreview('');
    setImageUrl('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/black-logo-rise.png" alt="Rise" className="h-8 w-auto" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">InstaCodes Admin</h1>
              <p className="text-xs text-gray-500">Manage your content wall</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/instaCodes"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View Wall →
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {storageWarning && (
          <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 text-sm px-5 py-4 rounded-xl">
            <p className="font-semibold mb-1">Storage not configured</p>
            <p>{storageWarning}</p>
            <p className="mt-2 text-amber-700">
              Quick fix: In Vercel → your project → <strong>Storage</strong> → create a <strong>Blob</strong> store and redeploy.
              Or set up free Supabase (see <code className="bg-amber-100 px-1 rounded">supabase/schema.sql</code> in the repo).
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Add New Item</h2>
              <p className="text-sm text-gray-500 mb-6">Fill in the details below</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. My Awesome Project"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link *</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of this item..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.png"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                  />
                  <label className={`flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all ${uploading ? 'opacity-60 pointer-events-none' : ''}`}>
                    <span className="text-sm text-gray-500">
                      {uploading ? 'Uploading...' : 'Or upload an image (max 10MB)'}
                    </span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                  </label>
                  {imagePreview && (
                    <div className="mt-3 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-32 object-contain bg-gray-50 rounded-xl border border-gray-100"
                      />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 text-green-600 text-sm px-4 py-3 rounded-xl border border-green-100">
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors shadow-sm"
                >
                  {submitting ? 'Adding...' : 'Add to Wall'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Current Items
                <span className="ml-2 text-sm font-normal text-gray-400">({items.length})</span>
              </h2>
            </div>

            {loadingItems ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
                Loading items...
              </div>
            ) : items.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-500">No items yet. Add your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex"
                  >
                    {item.image && (
                      <div className="w-28 shrink-0 bg-gray-50 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain p-2 max-h-24"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-4 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline mt-1 block truncate"
                      >
                        {item.link}
                      </a>
                    </div>
                    <div className="flex items-center px-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
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
