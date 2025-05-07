import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext.jsx";
const MentorHome = () => {
  const { userName } = useContext(LoginContext);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20">
        <div className="container lg:mt-6 mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
            {/* Welcome, <span className="text-yellow-400">{userName}</span> */}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Shape the future of tech by mentoring aspiring coders with your
            expertise.
          </p>
          <Link
            to="/mentorDashboard"
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
          >
            Start Mentoring
          </Link>
        </div>
      </section>

      {/* Mentor Dashboard */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
            Your Mentoring Dashboard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
              <div className="text-4xl text-yellow-400 mb-4">👨‍🎓</div>
              <h3 className="text-xl font-semibold text-white mb-2">50+</h3>
              <p className="text-base text-gray-300">Students Mentored</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
              <div className="text-4xl text-yellow-400 mb-4">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">100+</h3>
              <p className="text-base text-gray-300">Sessions Completed</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 text-center">
              <div className="text-4xl text-yellow-400 mb-4">💰</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                500 Coins
              </h3>
              <p className="text-base text-gray-300">Total Earnings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards */}
      <section className="py-16 sm:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
            Your Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border-l-4 border-yellow-400">
              <div className="text-4xl text-yellow-400 mb-4">📥</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                View Requests
              </h3>
              <p className="text-base text-gray-300">
                Check and respond to student mentorship requests.
              </p>
              <Link
                to="/mentor-requests"
                className="mt-4 inline-block text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                View Now
              </Link>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border-l-4 border-yellow-400">
              <div className="text-4xl text-yellow-400 mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Schedule Sessions
              </h3>
              <p className="text-base text-gray-300">
                Set up and manage your mentoring sessions.
              </p>
              <Link
                to="/schedule-sessions"
                className="mt-4 inline-block text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                Schedule Now
              </Link>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border-l-4 border-yellow-400">
              <div className="text-4xl text-yellow-400 mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Update Profile
              </h3>
              <p className="text-base text-gray-300">
                Enhance your profile with a picture and details.
              </p>
              <Link
                to="/mentor-profile-update"
                className="mt-4 inline-block text-yellow-400 hover:text-yellow-300 transition duration-300"
              >
                Update Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
            What Our Students Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
              <p className="text-base text-gray-300 mb-4">
                "Amit helped me build my first app. His guidance was amazing!"
              </p>
              <p className="text-yellow-400 font-semibold">
                — Priya K., Student
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
              <p className="text-base text-gray-300 mb-4">
                "Thanks to Amit, I mastered Python in just a month!"
              </p>
              <p className="text-yellow-400 font-semibold">
                — Rahul S., Student
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-800 to-blue-900">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Inspire?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Enhance your profile and connect with more students to make a
            lasting impact.
          </p>
          <Link
            to="/mentor-profile-update"
            className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
          >
            Update Profile
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// CSS Animation for fade-in
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-in-out;
  }
`;

export default MentorHome;
