import { useState, useContext } from "react";
import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { LoginContext } from "../Context/LoginContext";

function MentorProfile() {
  const { userName, UserProfilePhoto } = useContext(LoginContext);

  const [mentorApprovalData, setMentorApprovalData] = useState({
    fullName: userName || "",
    profilePicture: UserProfilePhoto || "",
    professionalTitle: "Senior React Developer",
    bio: "A passionate Senior React Developer with over 10 years of experience in building scalable web applications. I love mentoring students and helping them master modern JavaScript frameworks.",
    skills: ["React", "Node.js", "JavaScript", "TypeScript", "CSS", "Git"],
    primaryCategory: "Web Development",
    experienceLevel: "Senior",
    yearsOfExperience: "10",
    highestQualification: "Master's in Computer Science",
    certifications: ["AWS Certified Developer", "React Certified"],
    resume: "",
    timeSlots: ["Weekdays 5-7 PM", "Weekends 10 AM - 1 PM"],
    preferredDays: ["Monday", "Wednesday", "Friday"],
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    sessionPrice: "50",
    currency: "USD",
    sessionDuration: "60",
    linkedin: "#",
    github: "#",
    portfolio: "#",
    youtube: "#",
    demoVideo: "",
    experience: "10+ years in web development",
    teachingStyle: "Interactive, hands-on coding sessions",
    languages: ["English", "Hindi"],
    agreedToTerms: true,
    agreedToNDA: true,
  });

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
                  Complete your profile to start mentoring
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
                  src={mentorApprovalData.profilePicture}
                  alt={`${mentorApprovalData.fullName}'s Profile`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-yellow-400 shadow-md"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    {mentorApprovalData.fullName}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm sm:text-base">
                    {mentorApprovalData.professionalTitle}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {mentorApprovalData.experienceLevel}
                    </span>
                    <span className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {mentorApprovalData.yearsOfExperience} years exp
                    </span>
                    <span className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {mentorApprovalData.primaryCategory}
                    </span>
                  </div>
                  <p className="text-gray-200 mt-3 text-sm sm:text-base leading-relaxed">
                    {mentorApprovalData.bio}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* Mentor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Experience & Education */}
                  <div>
                    <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
                      Experience & Education
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs">Experience</p>
                        <p className="text-white">
                          {mentorApprovalData.experience}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">
                          Highest Qualification
                        </p>
                        <p className="text-white">
                          {mentorApprovalData.highestQualification}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Certifications</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mentorApprovalData.certifications.map(
                            (cert, index) => (
                              <span
                                key={index}
                                className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold"
                              >
                                {cert}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Teaching Details */}
                  <div>
                    <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
                      Teaching Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs">Teaching Style</p>
                        <p className="text-white">
                          {mentorApprovalData.teachingStyle}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Languages</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mentorApprovalData.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Session Details */}
                  <div>
                    <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
                      Session Details
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs">Session Price</p>
                        <p className="text-white">
                          {mentorApprovalData.sessionPrice}{" "}
                          {mentorApprovalData.currency} /{" "}
                          {mentorApprovalData.sessionDuration} min
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Availability</p>
                        <div className="space-y-1">
                          {mentorApprovalData.timeSlots.map((slot, index) => (
                            <p key={index} className="text-white">
                              {slot}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Preferred Days</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {mentorApprovalData.preferredDays.map(
                            (day, index) => (
                              <span
                                key={index}
                                className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold"
                              >
                                {day}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Time Zone</p>
                        <p className="text-white">
                          {mentorApprovalData.timeZone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
                      Skills & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mentorApprovalData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700"></div>

              {/* Social Links */}
              <div>
                <h3 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
                  Social Links
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {mentorApprovalData.linkedin && (
                    <a
                      href={mentorApprovalData.linkedin}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                    >
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {mentorApprovalData.github && (
                    <a
                      href={mentorApprovalData.github}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                    >
                      <span>GitHub</span>
                    </a>
                  )}
                  {mentorApprovalData.portfolio && (
                    <a
                      href={mentorApprovalData.portfolio}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                    >
                      <span>Portfolio</span>
                    </a>
                  )}
                  {mentorApprovalData.youtube && (
                    <a
                      href={mentorApprovalData.youtube}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition"
                    >
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium shadow-md transition duration-300 text-sm">
                  View Resume
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md transform hover:scale-105 transition duration-300 text-sm">
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
