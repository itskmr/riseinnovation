import React from 'react';
import { projectsData } from '../data/siteContent';

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Projects</h2>
        <p className="text-gray-600 text-center mb-12">
          Discover our portfolio of successful projects delivering innovative solutions across various industries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div key={project.title} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="h-64 relative bg-gray-100">
                <img src={project.image} alt={project.title} className="w-full h-full object-contain p-2" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                <div className="mt-auto">
                  <a href={project.link} className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
