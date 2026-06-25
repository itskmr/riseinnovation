import { useState, useEffect, Fragment } from 'react';
import { fetchItems } from '../lib/instaCodesApi';
import PageLayout from '../components/layout/PageLayout';
import AdsterraBanner from '../components/ads/AdsterraBanner';
import AdsterraNative from '../components/ads/AdsterraNative';

const MOBILE_ADS = [
  { adKey: '6e66f94ce57e3e9814971dab933f8507', width: 320, height: 50 },
  { adKey: '243e6cdf3098735b8d0798bb74dc3b4a', width: 300, height: 250 },
  { adKey: '97bff201806a427aaf8d2a7b9af730f5', width: 160, height: 300 },
  { adKey: 'c0e638bad5c2ab701e734422493a8103', width: 468, height: 60 },
  { adKey: '80cdf24322aec2affded6da3998cca5c', width: 728, height: 90 },
];

const InstaCodes = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetchItems()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout title="InstaCodes">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-1">InstaCodes Wall</h1>
          <p className="text-blue-100 text-sm md:text-base">Links, projects & resources — curated for you.</p>
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

      <section className="container mx-auto px-4 py-8 max-w-4xl">
        <AdsterraNative className="mb-6" />

        {loading ? (
          <p className="text-center text-gray-400 py-12">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Nothing here yet. Check back soon!</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            <ul className="flex-1 space-y-4">
              {items.map((item, i) => {
                const mobileAd = MOBILE_ADS[i % MOBILE_ADS.length];
                return (
                  <Fragment key={item.id}>
                    <li className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
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

                    {/* Mobile: ad after every item */}
                    <li className="md:hidden flex justify-center py-1">
                      <AdsterraBanner
                        key={`mobile-ad-${item.id}-${mobileAd.adKey}`}
                        adKey={mobileAd.adKey}
                        width={mobileAd.width}
                        height={mobileAd.height}
                      />
                    </li>

                    {/* Desktop: ad after first item only */}
                    {i === 0 && (
                      <li className="hidden md:flex justify-center py-2">
                        <AdsterraBanner adKey="243e6cdf3098735b8d0798bb74dc3b4a" width={300} height={250} />
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>

            <aside className="hidden lg:block w-40 shrink-0">
              <div className="sticky top-20">
                <AdsterraBanner adKey="27b0315506a5d59e4a84f3fdbaf30f24" width={160} height={600} />
              </div>
            </aside>
          </div>
        )}

        <div className="hidden md:flex justify-center mt-8 pt-4 border-t border-gray-100">
          <AdsterraBanner adKey="c0e638bad5c2ab701e734422493a8103" width={468} height={60} />
        </div>
      </section>
    </PageLayout>
  );
};

export default InstaCodes;
