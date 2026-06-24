import PageLayout from '../components/layout/PageLayout';

const Contact = () => (
  <PageLayout title="Contact Us">
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-blue-100 text-lg">We'd love to hear about your project.</p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have a project in mind? Whether you need a wedding website, yoga studio platform,
            WhatsApp automation, or custom software — send us a message and we'll respond within 24 hours.
          </p>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">Email</span>
              <a href="mailto:roizlive69@gmail.com" className="hover:text-blue-600">roizlive69@gmail.com</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">Phone</span>
              <a href="tel:+918287999852" className="hover:text-blue-600">+91 8287999852</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">Telegram</span>
              <a href="https://t.me/Itskmrr" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">@itskmrr</a>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">LinkedIn</span>
              <a href="https://in.linkedin.com/company/riseinnovations" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">Rise Innovations</a>
            </div>
          </div>
        </div>

        <form className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" placeholder="Your name" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Interested In</label>
            <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none">
              <option>Wedding Website</option>
              <option>Yoga Website</option>
              <option>WhatsApp Automation</option>
              <option>Telegram Automation</option>
              <option>Custom Software</option>
              <option>Website Maintenance</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} placeholder="Tell us about your project..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  </PageLayout>
);

export default Contact;
