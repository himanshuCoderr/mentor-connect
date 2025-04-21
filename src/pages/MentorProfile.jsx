import { useState, useEffect, useContext } from "react";
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { LoginContext } from "../Context/LoginContext";

function MentorProfile() {
  // Hardcoded mentor data
  const { userName, UserProfilePhoto } = useContext(LoginContext);


  const mentor = {
    name: userName,
    bio: "A passionate Senior React Developer with over 10 years of experience in building scalable web applications. I love mentoring students and helping them master modern JavaScript frameworks.",
    profilePicture: UserProfilePhoto,
    experience: "10+ years",
    hourlyRate: "50 Coins",
    availability: ["Weekdays 5-7 PM", "Weekends 10 AM - 1 PM"],
    teachingStyle: "Interactive, hands-on coding sessions",
    languages: ["English", "Hindi"],
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "CSS", "Git"],
    reviews: [
      {
        studentName: "John Doe",
        rating: 5,
        comment:
          "Sarah was incredibly helpful with my React project. She explained hooks in a way that finally clicked!",
      },
      {
        studentName: "Emma Smith",
        rating: 4,
        comment:
          "Great mentor, very knowledgeable. Could improve on time management during sessions.",
      },
    ],
    membershipPlan: {
      name: "Standard Plan",
      price: "$240 / month",
      description:
        "I'll be your go-to person and provide additional perspectives on tech and career topics.",
      features: [
        "2 calls per month (30min/call)",
        "Unlimited Q&A via chat",
        "Expect responses in 2 days",
      ],
      spotsLeft: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Mentor Profile Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 min-h-screen flex items-center">
        <div className="container md:mt-6 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Card */}
            <div className="bg-gray-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  Mentor Profile
                </h2>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  Meet your potential mentor.
                </p>
              </div>
              <button className="bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-xs sm:text-sm">
                Edit Profile
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 md:space-y-10">
              {/* Basic Info */}
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4 sm:gap-6">
                <img
                  src={mentor.profilePicture}
                  alt={`${mentor.name}'s Profile`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 shadow-md"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">
                    {mentor.experience} Experience
                  </p>
                  <p className="text-gray-200 mt-2 text-sm sm:text-base leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>
              </div>

              {/* Pricing & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                    Pricing
                  </h3>
                  <p className="text-base sm:text-lg text-white font-semibold">
                    {mentor.hourlyRate} / Hour
                  </p>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                    Availability
                  </h3>
                  <ul className="space-y-1">
                    {mentor.availability.map((slot, index) => (
                      <li
                        key={index}
                        className="text-base sm:text-lg text-white"
                      >
                        {slot}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Teaching Style & Languages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                    Teaching Style
                  </h3>
                  <p className="text-base sm:text-lg text-white">
                    {mentor.teachingStyle}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {mentor.languages.map((language, index) => (
                      <span
                        key={index}
                        className="bg-gray-700 text-yellow-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills & Technologies */}
              <div>
                <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                  Skills & Technologies
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {mentor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-yellow-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Membership Plan */}
              <div className="bg-gray-700 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">
                  {mentor.membershipPlan.name}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                  {mentor.membershipPlan.price}
                </p>
                <p className="text-gray-200 text-sm sm:text-base mb-3 sm:mb-4">
                  {mentor.membershipPlan.description}
                </p>
                <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                  {mentor.membershipPlan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-gray-200 text-sm sm:text-base flex items-center gap-2"
                    >
                      <span className="text-yellow-400">●</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-end">
                  <button className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 text-end">
                  Only {mentor.membershipPlan.spotsLeft} spot left!
                </p>
              </div>

              {/* Student Reviews & Ratings */}
              <div>
                <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-2 sm:mb-4">
                  Student Reviews & Ratings
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {mentor.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-gray-700 p-3 sm:p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <p className="text-base sm:text-lg font-semibold text-white">
                          {review.studentName}
                        </p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-yellow-400 ${
                                i < review.rating ? "opacity-100" : "opacity-50"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-200 text-sm sm:text-base">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <div className="flex justify-end">
                <button className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm">
                  Contact Mentor
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

export default MentorProfile;
