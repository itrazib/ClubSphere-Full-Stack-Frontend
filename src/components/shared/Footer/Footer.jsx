import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            ClubSphere
          </h2>
          <p className="text-sm leading-6 text-gray-400">
            ClubSphere is a modern platform for students to discover clubs,
            participate in events, and manage campus activities with ease.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@clubsphere.com</li>
            <li>Phone: +8801316-959094</li>
            <li>Location: University Campus</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/itrazib"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <Github size={24} />
            </a>

            <a
              href="https://linkedin.com/in/das-razib/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <Linkedin size={24} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-3">
          <p>
            © {new Date().getFullYear()} ClubSphere. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
