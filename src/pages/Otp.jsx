import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OTP() {
  const navigate = useNavigate();
  // const [userType, setUserType] = useState("mentor");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* OTP Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Card */}
            <div className="bg-gray-700 px-8 py-6 border-b border-gray-600">
              <h2 className="text-3xl font-bold text-white">Verify OTP</h2>
              <p className="text-gray-400 mt-1">
                Your OTP has been sent to your email and phone.
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <form className="space-y-6">
                {/* OTP Input */}
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    OTP For Mobile
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value=""
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter the OTP"
                    readOnly
                  />
                </div>
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm text-gray-400 font-medium uppercase tracking-wide mb-2"
                  >
                    OTP For Email
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value=""
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="Enter the OTP"
                    readOnly
                  />
                </div>
                {/* Verify Button */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="w-full bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
                    onClick={() => {
                      if (userType == "mentor") {
                        navigate("/mentorProfileCreate");
                      } else if (userType == "student") {
                        navigate("/postRequirment");
                      }
                    }}
                  >
                    Verify OTP
                  </button>
                </div>
              </form>
              <div className="mt-6 flex text-center justify-center items-center">
                <p className="text-gray-400">Didn’t receive the OTP?</p>
                <button className="text-yellow-400 hover:text-yellow-300 transition duration-300 ml-2">
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default OTP;