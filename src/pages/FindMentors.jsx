import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useNavigate } from "react-router-dom";

function FindMentors() {
  const navigate = useNavigate();

  const mentors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      profilePicture: './assests/images/man.jpg',
      experience: '10+ years',
      skills: ['React', 'Node.js', 'JavaScript'],
      pricing: '50 Coins / Hour',
      rating: 4.5,
      languages: ['English'],
      teachingStyle: ['Hands-on'],
    },
    {
      id: 2,
      name: 'Michael Brown',
      profilePicture: './assests/images/man2.webp',
      experience: '7 years',
      skills: ['Python', 'Django', 'SQL'],
      pricing: '40 Coins / Hour',
      rating: 4.8,
      languages: ['Hindi'],
      teachingStyle: ['Project-based'],
    },
    {
      id: 3,
      name: 'Emily Davis',
      profilePicture: './assests/images/man.jpg',
      experience: '5 years',
      skills: ['Java', 'Spring Boot', 'AWS'],
      pricing: '60 Coins / Hour',
      rating: '4.2',
      languages: ['Spanish'],
      teachingStyle: ['Theoretical'],
    },
    {
      id: 4,
      name: 'David Lee',
      profilePicture: './assests/images/man2.webp',
      experience: '8 years',
      skills: ['Angular', 'TypeScript', 'CSS'],
      pricing: '55 Coins / Hour',
      rating: '4.6',
      languages: ['French'],
      teachingStyle: ['Hands-on'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Find Mentors Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Header */}
          <div className="text-center mb-12 px-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">Find Your Perfect Mentor</h2>
            <p className="text-gray-400 mt-3 text-base sm:text-lg">Connect with experienced mentors to achieve your learning goals.</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 flex justify-center px-2">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                value="React"
                className="w-full px-4 sm:px-5 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 placeholder-gray-500"
                placeholder="Search mentors by name, skills, or keywords..."
                readOnly
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-gray-900 px-3 sm:px-4 py-1 rounded-lg font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition duration-300 text-sm sm:text-base">
                Search
              </button>
            </div>
          </div>

          {/* Main Content: Sidebar + Mentor Cards */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar (Filters) - Left Side */}
            <div className="lg:w-1/4 bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6 border-b border-gray-600 pb-2">Filters</h3>
              <div className="space-y-4 sm:space-y-5">
                {[
                  { id: 'skills', label: 'Skills', options: ['React', 'Node.js', 'Python', 'Java', 'Angular', 'TypeScript'] },
                  { id: 'experience', label: 'Experience Level', options: ['1-3 years', '3-5 years', '5+ years', '10+ years'] },
                  { id: 'pricing', label: 'Pricing (Coins/Hour)', options: ['0-30', '30-50', '50-100', '100+'] },
                  { id: 'languages', label: 'Languages', options: ['English', 'Hindi', 'Spanish', 'French'] },
                  { id: 'teachingStyle', label: 'Teaching Style', options: ['Hands-on', 'Theoretical', 'Project-based', 'Interactive'] },
                  { id: 'availability', label: 'Availability', options: ['Weekdays', 'Weekends', 'Evenings', 'Flexible'] },
                ].map(({ id, label, options }) => (
                  <div key={id}>
                    <label className="block text-xs sm:text-sm text-gray-300 font-medium uppercase tracking-wide mb-1 sm:mb-2">{label}</label>
                    <select
                      id={id}
                      className="w-full px-3 sm:px-4 py-1 sm:py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 text-sm sm:text-base"
                    >
                      <option value="">Select {label}</option>
                      {options.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  </div>
                ))}
                <button className="w-full bg-gray-600 text-gray-200 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-500 hover:shadow-lg transition duration-300 text-sm sm:text-base">
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Mentor Cards - Right Side */}
            <div className="lg:w-3/4 space-y-4 sm:space-y-6">
              {mentors.length > 0 ? (
                mentors.map((mentor) => (
                  <div
                    key={mentor.id}
                    className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center md:items-start md:text-left md:flex-row space-y-4 md:space-y-0 md:space-x-6 border border-gray-700 hover:shadow-xl transition duration-300"
                  >
                    {/* Profile Picture - Centered on mobile */}
                    <div className="flex flex-col items-center md:items-start">
                      <img
                        src={mentor.profilePicture}
                        alt={`${mentor.name}'s Profile`}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg border-4 border-yellow-400 shadow-md object-cover"
                      />
                      {/* Pricing - Show below image on mobile */}
                      <p className="text-base sm:text-lg text-white font-semibold mt-2 md:hidden">{mentor.pricing}</p>
                    </div>

                    {/* Mentor Details */}
                    <div className="flex-1 flex flex-col items-center md:items-start">
                      <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div className="text-center md:text-left">
                          <h3 className="text-xl sm:text-2xl font-semibold text-white">{mentor.name}</h3>
                          <p className="text-gray-400 mt-1 text-sm sm:text-base">{mentor.experience} Experience</p>
                        </div>
                        <div className="flex justify-center sm:justify-start items-center mt-2 sm:mt-0">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-yellow-400 ${i < Math.floor(parseFloat(mentor.rating)) ? 'opacity-100' : 'opacity-50'}`}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base">({mentor.rating})</span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                        {mentor.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-700 text-yellow-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Languages */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                        {mentor.languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Teaching Style */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                        {mentor.teachingStyle.map((style, index) => (
                          <span
                            key={index}
                            className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"
                          >
                            {style}
                          </span>
                        ))}
                      </div>

                      {/* Pricing - Hidden on mobile (shown above) */}
                      <p className="text-lg text-white font-semibold mt-3 hidden md:block">{mentor.pricing}</p>
                    </div>

                    {/* View Profile Button - Centered on mobile, bottom right on md/lg */}
                    <div className="w-full md:w-auto flex justify-center md:block md:self-end">
                      <button
                        className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                        onClick={() => {
                          navigate("/mentorProfile")
                        }}
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-12">
                  <p className="text-lg sm:text-xl">No mentors found matching your criteria.</p>
                  <p className="mt-2 text-sm sm:text-base">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FindMentors;