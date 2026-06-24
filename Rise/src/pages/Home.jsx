import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import { projectsData } from '../data/siteContent';

const Home = () => (
  <PageLayout title="Home">
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Transforming Ideas into <span className="text-blue-600">Digital</span> Reality
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Rise Innovations builds wedding websites, yoga platforms, AI WhatsApp automations,
            and custom software for businesses worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/portfolio" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              View Our Work
            </Link>
            <Link to="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold border border-blue-600 hover:bg-blue-50 transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src="/ai-img.png" alt="Rise Innovations" className="w-full max-w-lg object-contain" />
        </div>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-4">Featured Projects</h2>
      <p className="text-gray-500 text-center mb-10">A snapshot of our recent work</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectsData.slice(0, 3).map((project) => (
          <div key={project.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-48 bg-gray-50">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain p-3" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/portfolio" className="text-blue-600 font-semibold hover:underline">View all projects →</Link>
      </div>
    </section>

    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-blue-100 mb-8 max-w-xl mx-auto">Let's build something amazing together — from websites to AI automations.</p>
        <Link to="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
          Contact Us Today
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default Home;
