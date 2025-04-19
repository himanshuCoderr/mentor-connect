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

          {/* Dual Coin System */}
          <div className="max-w-6xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
              How Our Coin System Works
            </h2>

            {/* Student Flow */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">
                  👨‍🎓
                </div>
                <h3 className="text-2xl font-bold text-white">For Students</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Step 1 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-blue-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    1
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    Find a mentor and click{" "}
                    <span className="text-yellow-400">"Contact"</span>
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-blue-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    2
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    Pay <span className="text-yellow-400">60 coins</span> to
                    unlock chat
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-blue-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    3
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    Mentor receives{" "}
                    <span className="text-yellow-400">48 coins</span> (80%)
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-300">
                  <span className="font-bold text-blue-400">Example:</span> To
                  message Vishal (React expert), you pay 60 coins. He gets 48
                  coins, and 12 coins cover platform fees.
                </p>
              </div>
            </div>

            {/* Mentor Flow */}
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl">
                  👨‍🏫
                </div>
                <h3 className="text-2xl font-bold text-white">For Mentors</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {/* Step 1 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-green-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    1
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    View student requests in your{" "}
                    <span className="text-yellow-400">Dashboard</span>
                  </p>
                </div>
                {/* Step 2 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-green-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    2
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    Pay <span className="text-yellow-400">40 coins</span> to see
                    contact info
                  </p>
                </div>
                {/* Step 3 */}
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="bg-green-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold mb-2 mx-auto">
                    3
                  </div>
                  <p className="text-gray-300 text-center text-sm">
                    Student gets{" "}
                    <span className="text-yellow-400">20 coins</span> (50%)
                  </p>
                </div>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg border-l-4 border-green-400">
                <p className="text-gray-300">
                  <span className="font-bold text-green-400">Example:</span> To
                  contact Shelba (assignment help), you pay 40 coins. She gets
                  20 coins, and 20 coins cover platform fees.
                </p>
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
                      Fair for Everyone
                    </h3>
                    <p className="text-gray-400">
                      Mentors earn more when students contact them (80%), but
                      pay less to recruit students (50%).
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
                      discounts.
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
                      No currency conversions. Coins work the same worldwide.
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
