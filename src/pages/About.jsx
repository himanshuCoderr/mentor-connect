import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />

      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
              About MentorConnect
            </h1>
            <p className="text-xl text-gray-300">
              Learn, Teach, and Grow with Our Coin-Based System
            </p>
          </div>

          {/* Mission Section */}
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-300 mb-4">
                  At MentorConnect, we believe knowledge should be accessible,
                  flexible, and rewarding for both mentors and learners. Our
                  coin system eliminates traditional payment barriers, making
                  mentorship sessions effortless.
                </p>
                <p className="text-gray-300">
                  <strong>Why choose us?</strong> We prioritize quality,
                  affordability, and transparency—ensuring every coin spent
                  translates to real growth.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-yellow-400 font-bold mb-2">500+</h3>
                    <p className="text-gray-400 text-sm">Active Mentors</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-yellow-400 font-bold mb-2">10,000+</h3>
                    <p className="text-gray-400 text-sm">Students Helped</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-yellow-400 font-bold mb-2">50+</h3>
                    <p className="text-gray-400 text-sm">Skill Categories</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-yellow-400 font-bold mb-2">24/7</h3>
                    <p className="text-gray-400 text-sm">Availability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">
              How MentorConnect Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="bg-yellow-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Post Your Requirement
                </h3>
                <p className="text-gray-400">
                  Describe what you need—whether it's coding help, career
                  advice, or project feedback. Set your budget in coins.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="bg-yellow-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Find Your Mentor
                </h3>
                <p className="text-gray-400">
                  Browse mentor profiles, reviews, and coin rates. Book a
                  session with your preferred expert.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="bg-yellow-400 text-gray-900 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Start Learning
                </h3>
                <p className="text-gray-400">
                  Connect via video/chat. Coins are transferred to the mentor
                  only after session completion.
                </p>
              </div>
            </div>
          </div>

          {/* Coin System Section */}
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
              Our Dynamic Coin System
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Student Side */}
              <div className="bg-gray-700 p-6 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    👨‍🎓
                  </div>
                  <h3 className="text-xl font-bold text-white">For Students</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Contact a mentor by paying coins based on their{" "}
                      <strong>demand</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Example: Low demand (~50 coins), High demand (~100+ coins)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Platform retains <strong>100% of the coins</strong>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Mentor Side */}
              <div className="bg-gray-700 p-6 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    👨‍🏫
                  </div>
                  <h3 className="text-xl font-bold text-white">For Mentors</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      View student contacts by paying coins based on their{" "}
                      <strong>level</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Example: Regular level (~30 coins), Top-tier level (~60+
                      coins)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>
                      Platform retains <strong>100% of the coins</strong>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-900 p-4 rounded-lg border border-yellow-400">
              <h4 className="text-yellow-400 font-bold mb-2 text-center">
                Important Notes
              </h4>
              <div className="text-gray-300 text-center">
                <p>• Coin costs vary based on mentor demand or student level</p>
                <p>• No free coins - all connections require payment</p>
                <p>
                  • Coins must be purchased to initiate or access any contact
                </p>
                <p>
                  • Payments are made directly to the platform for facilitating
                  connections
                </p>
                <p>• Transfers happen instantly when connections are made</p>
              </div>
            </div>
          </div>

          {/* Why Use Coins? */}
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
              Why We Use Coins
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-6">
                  <div className="bg-yellow-400 text-gray-900 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Fair & Value-Driven
                    </h3>
                    <p className="text-gray-400">
                      Coin costs reflect the value of connections: high-demand
                      mentors or top-tier students require more coins, ensuring
                      fair access to quality interactions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400 text-gray-900 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Simple Pricing
                    </h3>
                    <p className="text-gray-400">
                      1 Coin = ₹1. Buy bulk packs (e.g., 500 coins for ₹400) for
                      discounts to access mentors or students.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-6">
                  <div className="bg-yellow-400 text-gray-900 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Secure & Transparent
                    </h3>
                    <p className="text-gray-400">
                      All transactions are logged. Dispute? Get refunds in coins
                      within 24 hours.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400 text-gray-900 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Global Access
                    </h3>
                    <p className="text-gray-400">
                      No currency conversions. Coins work the same worldwide for
                      seamless connections.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section (unchanged) */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
              Our Team
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 mb-4 flex items-center justify-center text-4xl text-yellow-400">
                  J
                </div>
                <h3 className="text-xl font-bold text-white">John Doe</h3>
                <p className="text-yellow-400 mb-3">Founder & CEO</p>
                <p className="text-gray-400 text-sm">
                  Passionate about making quality education accessible to
                  everyone.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 mb-4 flex items-center justify-center text-4xl text-yellow-400">
                  S
                </div>
                <h3 className="text-xl font-bold text-white">Sarah Johnson</h3>
                <p className="text-yellow-400 mb-3">Head of Mentors</p>
                <p className="text-gray-400 text-sm">
                  Connects students with the perfect mentors for their needs.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-gray-800 rounded-xl p-6 text-center shadow-lg">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-700 mb-4 flex items-center justify-center text-4xl text-yellow-400">
                  R
                </div>
                <h3 className="text-xl font-bold text-white">Raj Patel</h3>
                <p className="text-yellow-400 mb-3">Tech Lead</p>
                <p className="text-gray-400 text-sm">
                  Ensures our platform runs smoothly and securely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
