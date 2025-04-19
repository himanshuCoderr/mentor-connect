import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage se user data lo
    const email = localStorage.getItem("userEmail");
    const type = localStorage.getItem("userType");
    const name = localStorage.getItem("userName");
    setUserEmail(email);
    setUserType(type);
    setUserName(name);
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Saara data clear
    setUserEmail(null);
    setUserType(null);
    setUserName(null);
    navigate("/login");
  };

  return (
    <header className="bg-gray-900/90 backdrop-blur-md py-3 sm:py-4 shadow-md fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
        <Link
          to="/"
          className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400"
        >
          MentorConnect
        </Link>

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

          {userType === "student" && (
            <Link
              to="/postRequirement"
              className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
            >
              Post Requirement
            </Link>
          )}

          {userType === "student" && (
            <Link
              to="/myRequirement"
              className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
            >
              My Requirement
            </Link>
          )}

          {userType === "mentor" && (
            <Link
              to="/mentorDashboard"
              className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
            >
              Mentor DashBoard
            </Link>
          )}
          <Link
            to="/about"
            className="block py-2 px-4 sm:px-6 text-base sm:text-lg hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
          {userEmail ? (
            <div className="relative">
              <div className="flex flex-col items-center space-y-1 sm:px-6">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="text-base sm:text-lg hover:text-yellow-300 transition duration-300"
                >
                  <i className="hover:text-gray-900/90 hover:bg-yellow-300 p-[10px] rounded-full fa-solid fa-user text-white"></i>
                </button>
                <p className="text-white text-sm sm:text-base">{userName}</p>
              </div>
              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-30 bg-gray-800 rounded-md shadow-lg z-20">
                  <Link
                    to={
                      userType === "mentor"
                        ? "/mentorProfile"
                        : "/studentProfile"
                    }
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setShowMenu(false)}
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
