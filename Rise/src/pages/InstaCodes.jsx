import { useState, useEffect } from 'react';
import { fetchItems } from '../lib/instaCodesApi';
import PageLayout from '../components/layout/PageLayout';

const InstaCodes = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout title="InstaCodes">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-2">InstaCodes Wall</h1>
          <p className="text-blue-100">Links, projects & resources — curated for you.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 max-w-3xl">
        {loading ? (
          <p className="text-center text-gray-400 py-16">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400 py-16">Nothing here yet. Check back soon!</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h2>
                {item.description && (
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.description}</p>
                )}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl"
                >
                  Open Link →
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageLayout>
  );
};

export default InstaCodes;
