import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const About = () => (
  <PageLayout title="About Us">
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">About Rise Innovations</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Transforming ideas into digital reality since day one.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
        <p>
          <strong className="text-gray-900">Rise Innovations</strong> is a technology company specializing in
          web development, AI automation, and custom software solutions. Based in India, we serve clients
          globally — from wedding planners and yoga studios to startups building the next generation of
          blockchain and AI-powered applications.
        </p>
        <p>
          Our team combines creative design with robust engineering. We build wedding websites that delight
          guests, yoga studio platforms that fill classes, WhatsApp bots that never sleep, and full-stack
          applications deployed on modern cloud infrastructure like Vercel and NEAR Protocol.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 pt-4">What We Do</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Wedding & event website development</li>
          <li>Yoga studio & wellness platform websites</li>
          <li>AI-powered WhatsApp & Telegram automation</li>
          <li>Custom web applications & dashboards</li>
          <li>Blockchain smart contracts on NEAR Protocol</li>
          <li>Website maintenance & performance optimization</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 pt-4">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
          {[
            { title: 'Modern Tech Stack', desc: 'React, Node.js, AI integrations, and cloud-native deployment.' },
            { title: 'Fast Delivery', desc: 'Agile development with clear milestones and regular updates.' },
            { title: 'Affordable Pricing', desc: 'Quality solutions tailored to small business budgets.' },
            { title: 'Ongoing Support', desc: 'We don\'t disappear after launch — maintenance plans available.' },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Get in Touch →
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
