import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="bg-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Company Info */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4">MentorConnect</h4>
          <p className="text-sm sm:text-base text-gray-400">
            Bridging the gap between students and software engineering experts.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="text-sm sm:text-base text-gray-400 hover:text-yellow-300 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="" 
                className="text-sm sm:text-base text-gray-400 hover:text-yellow-300 transition duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="text-center sm:text-left">
          <h4 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 sm:mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a 
                href="#" 
                className="text-sm sm:text-base text-gray-400 hover:text-yellow-300 transition duration-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-sm sm:text-base text-gray-400 hover:text-yellow-300 transition duration-300"
              >
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
        <p>© 2025 MentorConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;