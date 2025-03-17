
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="mb-6">
              Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.
            </p>
            <div className="mb-4">
              <p className="mb-2">Email: roizlive69@gmail.com</p>
              <p className="mb-2">Phone: +91 8287999852</p>
              <p className="mb-2">Telegram: <a href="https://t.me/Itskmrr" target="_blank" rel="noopener noreferrer">@itskmrr</a></p>
            </div>
          </div>
          <div className="md:w-1/2">
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                />
              </div>
              <div>
                <label className="block mb-1">Message</label>
                <textarea
                  placeholder="Your message"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;