import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchItems } from '../lib/instaCodesApi';
import PageLayout from '../components/layout/PageLayout';
import AdsterraBanner from '../components/ads/AdsterraBanner';
import AdsterraNative from '../components/ads/AdsterraNative';

const SMARTLINK =
  'https://ambitionbookingslick.com/pmuj10bj?key=bc737f97995820280566de977fe33315';

const ANTI_ADBLOCK_SCRIPT =
  'https://ambitionbookingslick.com/a8/9d/df/a89ddf225f5291bec23578c93a9ef8d3.js';

const InstaCodeLink = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = ANTI_ADBLOCK_SCRIPT;
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetchItems()
      .then((items) => {
        const found = items.find((entry) => String(entry.id) === String(id));
        setItem(found || null);
      })
      .catch(() => setItem(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleOpenLink = () => {
    if (!item?.link) return;
    window.open(SMARTLINK, '_blank', 'noopener,noreferrer');
    window.location.href = item.link;
  };

  if (loading) {
    return (
      <PageLayout title="Loading Link">
        <p className="text-center text-gray-400 py-24">Loading...</p>
      </PageLayout>
    );
  }

  if (!item) {
    return (
      <PageLayout title="Link Not Found">
        <div className="container mx-auto px-4 py-24 text-center max-w-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Link not found</h1>
          <p className="text-gray-500 mb-6">This link may have been removed or is no longer available.</p>
          <Link
            to="/instaCodes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl"
          >
            ← Back to InstaCodes
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={item.title}>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2">{item.title}</h1>
          {item.description && (
            <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto">{item.description}</p>
          )}
        </div>
      </section>

      <div className="bg-gray-50 border-b border-gray-100 py-2 flex justify-center">
        <div className="hidden md:block">
          <AdsterraBanner adKey="80cdf24322aec2affded6da3998cca5c" width={728} height={90} />
        </div>
        <div className="md:hidden">
          <AdsterraBanner adKey="6e66f94ce57e3e9814971dab933f8507" width={320} height={50} />
        </div>
      </div>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <AdsterraNative className="mb-6" />

        <div className="flex justify-center mb-6">
          <AdsterraBanner adKey="243e6cdf3098735b8d0798bb74dc3b4a" width={300} height={250} />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center">
          <p className="text-gray-600 mb-6">
            Your link is ready. Tap the button below to continue to your destination.
          </p>
          <button
            type="button"
            onClick={handleOpenLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-10 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            Open Link →
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <AdsterraBanner adKey="c0e638bad5c2ab701e734422493a8103" width={468} height={60} />
        </div>

        <div className="flex justify-center mt-6 md:hidden">
          <AdsterraBanner adKey="97bff201806a427aaf8d2a7b9af730f5" width={160} height={300} />
        </div>

        <p className="text-center mt-8">
          <Link to="/instaCodes" className="text-sm text-gray-400 hover:text-blue-600 transition-colors">
            ← Back to InstaCodes Wall
          </Link>
        </p>
      </section>
    </PageLayout>
  );
};

export default InstaCodeLink;
