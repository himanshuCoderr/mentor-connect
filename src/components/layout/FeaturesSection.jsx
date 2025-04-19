import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(false);

  useEffect(() => {
    // localStorage se check karo user logged in hai ya nahi
    const email = localStorage.getItem("userEmail");
    setLoginState(!!email); // true agar email hai, else false
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-8 sm:mb-12 md:mb-16">
          Empowering Connections in Tech
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {/* Feature Card 1 */}
          <div className="bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition duration-300">
            <div className="text-yellow-400 text-4xl sm:text-5xl mb-3 sm:mb-4">
              ✍️
            </div>
            <h2
              onClick={() => {
                if (loginState) {
                  navigate("/postRequirement");
                } else {
                  navigate("/login");
                }
              }}
              className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4"
            >
              Request Mentorship
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Post detailed requests and let our system match you with the
              perfect mentor.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition duration-300">
            <div className="text-yellow-400 text-4xl sm:text-5xl mb-3 sm:mb-4">
              👨‍🏫
            </div>
            <Link
              to="/findMentors"
              className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4"
            >
              Top-Tier Mentors
            </Link>
            <p className="text-sm sm:text-base text-gray-300">
              Access a network of skilled software engineers ready to guide you.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gray-700 p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition duration-300">
            <div className="text-yellow-400 text-4xl sm:text-5xl mb-3 sm:mb-4">
              💸
            </div>
            <Link to="/about" className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
              Coin System
            </Link>
            <p className="text-sm sm:text-base text-gray-300">
              Securely connect with mentors or students using our digital coin
              model.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
