import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center z-10">
      <Link to="/home" className="text-2xl font-bold text-blue-500 flex items-center">
        <img 
          src="black-logo-rise.png" 
          alt="Rise Innovations Logo" 
          className="h-8 w-auto" // Matches the approximate height of the button
        />
        <h3 className="ml-2">Rise Innovations</h3>
      </Link>

      <div className="space-x-4">
       
        {/* <Link
          to="/home#Footer"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Contact Us
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;

