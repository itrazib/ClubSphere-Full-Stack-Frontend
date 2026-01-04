import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">Contact ClubSphere</h1>
          <p className="text-lg text-blue-100">
            We’re here to help you manage and grow your community
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-16 pb-20">
        <div className="bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
          
          {/* Left Info */}
          <div className="p-10 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Get in touch</h2>

            <div className="space-y-4 text-gray-700">
              <p>📧 support@clubsphere.com</p>
              <p>📞 +880 1234 567890</p>
              <p>📍 Dhaka, Bangladesh</p>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              Our support team usually responds within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form className="p-10 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="john@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                rows="4"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full btn-club"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
