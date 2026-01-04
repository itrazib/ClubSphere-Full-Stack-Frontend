import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            ClubSphere
          </h2>
          <p className="text-sm leading-6">
            ClubSphere is a hub for students to explore clubs, join events,
            and manage campus activities seamlessly. Stay connected, stay active!
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Contact
          </h2>
          <p className="text-sm">Email: support@clubsphere.com</p>
          <p className="text-sm">Phone: +8801316-959094</p>
          <p className="text-sm">Location: University Campus</p>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Follow Us
          </h2>
          <div className="flex items-center gap-5 mt-2">

            <a
              href="https://github.com/itrazib"
              target="_blank"
              className="hover:text-white transition"
            >
              <Github size={26} />
            </a>

            <a
              href="https://linkedin.com/in/das-razib/"
              target="_blank"
              className="hover:text-white transition"
            >
              <Linkedin size={26} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white transition"
            >
              <Twitter size={26} />
            </a>

          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ClubSphere — All Rights Reserved.
      </div>
    </footer>
  );
}
