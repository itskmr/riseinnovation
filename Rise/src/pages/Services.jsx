import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { servicesData } from '../data/siteContent';

const Services = () => (
  <PageLayout title="Our Services">
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Our Services</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          From wedding websites to AI automation — we build digital solutions that grow your business.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all p-6 flex flex-col"
          >
            <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-2">{service.title}</h2>
            <p className="text-sm text-blue-600 font-medium mb-3">{service.tagline}</p>
            <p className="text-gray-500 text-sm flex-grow">{service.description}</p>
            <span className="mt-4 text-blue-600 text-sm font-semibold group-hover:underline">Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Services;
