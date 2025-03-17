import React from 'react';

const projectsData = [
  { 
    title: 'MultiXender ', 
    description: 'A smart contract on NEAR that transfers tokens to multiple users by parsing JSON input for receiver IDs', 
    image: 'MultiXsender.png',
    link: 'https://test.near.org/multisend.testnet/widget/MultiXender_HomePage'
  },
  { 
    title: 'HL City Site', 
    description: 'Discover properties in HL City and book appointments effortlessly with our all-in-one listing platform.', 
    image: 'land2lavish.png',
    link: 'https://hlcity-6ndul7w1z-itskmrs-projects.vercel.app/'
  },
  { 
    title: 'Near India Workshop', 
    description: 'Near India Workshop: A NEAR Blockchain app to capture and securely store photos on-chain.', 
    image: '/near-india-rakhi.png',
    link: 'https://near-india.vercel.app/'
  },
  { 
    title: 'FaceSync', 
    description: 'FaceSync - A seamless video calling experience for everyone.', 
    image: '/facesync.png',
    link: 'https://video-call-application-mauve.vercel.app/'
  },
  { 
    title: 'BuddyUp', 
    description: 'BuddyUp: The ultimate social platform to connect, share, and chat effortlessly.', 
    image: '/BuddyUp.png',
    link: 'https://msg-io.onrender.com/'
  },
  { 
    title: 'Email Automation Platform', 
    description: 'Supercharge your email game with AI – craft, send, and track all your emails in one powerful platform.', 
    image: '/emailapp.png',
    link: 'https://email-pro-ai-powered.vercel.app/'
  },
  
 
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Projects</h2>
        <p className="text-gray-600 text-center mb-12">
          Discover our portfolio of successful projects delivering innovative solutions across various industries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="h-64 relative bg-gray-100">
                {/* Use the actual image with object-contain to avoid cropping */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
                <div className="mt-auto">
                  <a 
                    href={project.link}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
