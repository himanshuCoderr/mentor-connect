import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-900/90 backdrop-blur-md py-3 sm:py-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
          MentorConnect
        </h1>

        {/* Hamburger Icon */}
        <button
          className="text-yellow-400 text-2xl md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <nav
          className={`md:flex md:space-x-4 lg:space-x-6 xl:space-x-8 items-center absolute md:static top-full left-0 w-full md:w-auto bg-gray-900 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/postRequirment"
            className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
          >
            Post Requirement
          </Link>
          <Link
            to="#"
            className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/studentProfile"
            className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
          >
            User Profile
          </Link>
          {userEmail ? (
            <>
              <span className="text-yellow-300 px-4">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
