// client/src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gray-100 py-20 flex items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 p-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Transforming Ideas into <span className="text-blue-600">Digital</span> Reality
          </h1>
          <p className="text-gray-600 mb-6">
            We are a leading technology company specializing in innovative solutions that drive business growth and digital transformation.
          </p>
          <div className="space-x-4">
            <Link
              to="/#projects"
              onClick={() => handleScroll('projects')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Our Work
            </Link>
            <Link
              to="/#contact"
              onClick={() => handleScroll('contact')}
              className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-gray-100"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center">
          {/* Image now takes full width of its container */}
          <img 
            src="ai-img.png" 
            alt="Hero" 
            className="w-full h-auto max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;