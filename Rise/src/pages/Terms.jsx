import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const Terms = () => (
  <PageLayout title="Terms & Conditions" showAd={false}>
    <section className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: June 24, 2026</p>

      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
          <p>By accessing riseinnovations.in, you agree to these Terms & Conditions. If you disagree, please do not use our website.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">2. Services</h2>
          <p>Rise Innovations provides web development, AI automation, and software services as described on our website. Project scope, timelines, and pricing are agreed upon separately for each engagement.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">3. Intellectual Property</h2>
          <p>All content on this website — including text, images, logos, and code — is owned by Rise Innovations unless otherwise stated. Client project deliverables are transferred upon full payment as per individual agreements.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">4. User Content</h2>
          <p>Content submitted through contact forms or admin panels must not violate any laws or third-party rights. We reserve the right to remove inappropriate content.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
          <p>Rise Innovations is not liable for any indirect, incidental, or consequential damages arising from use of this website or our services.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">6. Governing Law</h2>
          <p>These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in India.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900">7. Contact</h2>
          <p>Questions about these terms? Email <a href="mailto:roizlive69@gmail.com" className="text-blue-600">roizlive69@gmail.com</a>.</p>
        </section>
      </div>

      <div className="mt-10">
        <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    </section>
  </PageLayout>
);

export default Terms;
