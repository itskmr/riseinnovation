import { Link, useParams } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { servicesData } from '../data/siteContent';

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <PageLayout title="Service Not Found">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/services" className="text-blue-600 hover:underline">← All Services</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={service.title}>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/services" className="text-blue-200 text-sm hover:text-white mb-4 inline-block">← All Services</Link>
          <h1 className="text-4xl font-extrabold mb-2">{service.title}</h1>
          <p className="text-blue-100 text-lg">{service.tagline}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <p className="text-gray-600 text-lg leading-relaxed mb-10">{service.description}</p>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <span className="text-blue-600 font-bold mt-0.5">✓</span>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
          Request a Quote →
        </Link>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
