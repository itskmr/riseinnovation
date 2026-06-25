import { useEffect } from 'react';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';
import AdsterraBanner from '../ads/AdsterraBanner';

const PageLayout = ({ children, title, showTopAd = false }) => {
  useEffect(() => {
    document.title = title ? `${title} | Rise Innovations` : 'Rise Innovations';
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteNavbar />
      {showTopAd && (
        <div className="border-b border-gray-100 bg-gray-50 py-1">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="hidden md:block">
              <AdsterraBanner adKey="80cdf24322aec2affded6da3998cca5c" width={728} height={90} />
            </div>
            <div className="md:hidden">
              <AdsterraBanner adKey="6e66f94ce57e3e9814971dab933f8507" width={320} height={50} />
            </div>
          </div>
        </div>
      )}
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default PageLayout;
