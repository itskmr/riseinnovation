import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const PrivacyPolicy = () => (
  <PageLayout title="Privacy Policy" showAd={false}>
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 24, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Introduction</h2>
          <p>
            Rise Innovations ("we", "our", "us") operates the website{' '}
            <a href="https://www.riseinnovations.in" className="text-blue-600">riseinnovations.in</a>.
            This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact information you provide (name, email, phone) via contact forms</li>
            <li>Usage data such as pages visited, browser type, and device information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Google AdSense & Third-Party Advertising</h2>
          <p>
            We use <strong>Google AdSense</strong> to display advertisements on our website. Google and its partners
            may use cookies to serve ads based on your prior visits to this website or other websites.
          </p>
          <p>
            Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit
            to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600">
              Google Ads Settings
            </a>.
          </p>
          <p>
            Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your
            website or other websites. You can learn more at{' '}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600">
              Google Advertising Policies
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">4. Cookies</h2>
          <p>
            We use cookies to improve your browsing experience, analyze site traffic, and support advertising.
            You can control cookies through your browser settings. Disabling cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">5. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To respond to your inquiries and provide services</li>
            <li>To improve our website and user experience</li>
            <li>To display relevant advertisements via Google AdSense</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">6. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However, no method
            of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Contact Us</h2>
          <p>
            For privacy-related questions, contact us at{' '}
            <a href="mailto:roizlive69@gmail.com" className="text-blue-600">roizlive69@gmail.com</a> or
            call <a href="tel:+918287999852" className="text-blue-600">+91 8287999852</a>.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </section>
  </PageLayout>
);

export default PrivacyPolicy;
