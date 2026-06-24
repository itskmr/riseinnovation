import { Link } from 'react-router-dom';

const SiteFooter = () => (
  <footer className="bg-gray-900 text-gray-300 mt-auto">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src="/black-logo-rise.png" alt="Rise Innovations" className="h-8 w-auto mb-3 invert brightness-200" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Rise Innovations builds websites, AI automations, and custom software for businesses worldwide.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services/wedding-websites" className="hover:text-white">Wedding Websites</Link></li>
            <li><Link to="/services/yoga-websites" className="hover:text-white">Yoga Websites</Link></li>
            <li><Link to="/services/ai-whatsapp-automation" className="hover:text-white">WhatsApp Automation</Link></li>
            <li><Link to="/services/custom-software" className="hover:text-white">Custom Software</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/instaCodes" className="hover:text-white">InstaCodes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
          <div className="mt-4 text-sm">
            <p>Email: roizlive69@gmail.com</p>
            <p>Phone: +91 8287999852</p>
            <a href="https://in.linkedin.com/company/riseinnovations" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rise Innovations. All rights reserved.
      </div>
    </div>
  </footer>
);

export default SiteFooter;
