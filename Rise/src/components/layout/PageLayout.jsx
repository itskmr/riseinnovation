import { useEffect } from 'react';
import SiteNavbar from './SiteNavbar';
import SiteFooter from './SiteFooter';
import AdBanner from '../AdBanner';

const PageLayout = ({ children, title, showAd = true }) => {
  useEffect(() => {
    document.title = title ? `${title} | Rise Innovations` : 'Rise Innovations';
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteNavbar />
      {showAd && (
        <div className="bg-gray-50 border-b border-gray-100 py-2">
          <div className="container mx-auto px-4">
            <AdBanner className="min-h-[60px]" />
          </div>
        </div>
      )}
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default PageLayout;
