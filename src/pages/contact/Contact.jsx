import React from "react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-gray-600 text-center mb-10">
        Have questions or need support? Reach out to the ClubSphere team.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-2">📧 Email: support@clubsphere.com</p>
          <p className="text-gray-600 mb-2">📞 Phone: +880 1234 567890</p>
          <p className="text-gray-600">📍 Address: Dhaka, Bangladesh</p>
        </div>

        {/* Contact Form */}
        <form className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
