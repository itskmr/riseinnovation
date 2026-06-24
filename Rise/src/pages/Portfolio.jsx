import PageLayout from '../components/layout/PageLayout';
import { projectsData } from '../data/siteContent';

const Portfolio = () => (
  <PageLayout title="Portfolio">
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Our Portfolio</h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Discover our successful projects delivering innovative solutions across industries.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <div key={project.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
            <div className="h-56 bg-gray-50 flex items-center justify-center">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain p-4" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-grow">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors w-fit"
              >
                View Project →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Portfolio;
