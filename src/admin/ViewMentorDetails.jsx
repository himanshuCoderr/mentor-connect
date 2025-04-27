import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import React, { useState, useEffect } from "react";
import { db } from "../BACKEND/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore"; // Add Timestamp import

function ViewMentorDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changesNeeded, setChangesNeeded] = useState("");
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const userDoc = await getDoc(doc(db, "users", id));
        const mentorReqDoc = await getDoc(doc(db, "mentorRequest", id));

        if (!userDoc.exists() || !mentorReqDoc.exists()) {
          throw new Error("Mentor data not found");
        }

        const userData = userDoc.data();
        const mentorData = mentorReqDoc.data();

        const mergedData = {
          id,
          name: userData.name || "N/A",
          email: userData.email || "N/A",
          emailVerified: userData.emailVerified || false,
          mobileNumber: userData.mobileNumber || "N/A",
          profilePhoto: userData.profilePhoto || "",
          userType: userData.userType || "pendingMentor",
          createdAt: userData.createdAt || mentorData.createdAt || "N/A", // Handle Timestamp
          fullName: mentorData.fullName || userData.name || "N/A",
          professionalTitle: mentorData.professionalTitle || "N/A",
          bio: mentorData.bio || "No bio provided",
          skills: mentorData.skills || [],
          primaryCategory: mentorData.primaryCategory || "N/A",
          experienceLevel: mentorData.experienceLevel || "N/A",
          yearsOfExperience: mentorData.yearsOfExperience || "N/A",
          highestQualification: mentorData.highestQualification || "N/A",
          certifications: mentorData.certifications || [],
          resume: mentorData.resume || "",
          timeSlots: mentorData.timeSlots || [],
          preferredDays: mentorData.preferredDays || [],
          timeZone: mentorData.timeZone || "N/A",
          sessionPrice: mentorData.sessionPrice || "N/A",
          currency: mentorData.currency || "N/A",
          sessionDuration: mentorData.sessionDuration || "N/A",
          linkedin: mentorData.linkedin || "",
          github: mentorData.github || "",
          portfolio: mentorData.portfolio || "",
          youtube: mentorData.youtube || "",
          demoVideo: mentorData.demoVideo || "",
          experience: mentorData.experience || "N/A",
          teachingStyle: mentorData.teachingStyle || "N/A",
          languages: mentorData.languages || [],
          agreedToTerms: mentorData.agreedToTerms || false,
          agreedToNDA: mentorData.agreedToNDA || false,
        };

        setMentor(mergedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load mentor details.");
        setLoading(false);
        console.error("Fetch Error:", err);
      }
    };

    fetchMentorData();
  }, [id]);

  const handleRequestReapproval = () => {
    if (changesNeeded.trim()) {
      alert(`Re-approval request sent to ${mentor.fullName}: ${changesNeeded}`);
      setChangesNeeded("");
      setIsModalOpen(false);
    } else {
      alert("Please specify the changes needed.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <svg
          className="animate-spin h-8 w-8 text-yellow-400"
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
        </svg>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans flex items-center justify-center">
        <p className="text-xl text-red-400">{error || "Mentor not found."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900">
        <div className="container lg:mt-6 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Link
              to="/adminDashBoard"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-6 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Dashboard
            </Link>

            <div className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
              {/* Mentor Header */}
              <div className="bg-gray-700/50 px-6 py-8 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center">
                <div className="flex-shrink-0 mb-6 sm:mb-0 sm:mr-8">
                  {mentor.profilePhoto ? (
                    <img
                      src={mentor.profilePhoto}
                      alt={mentor.fullName}
                      className="h-32 w-32 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-32 w-32 rounded-full bg-gray-600 flex items-center justify-center text-4xl font-bold text-white">
                      {mentor.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {mentor.fullName}
                  </h1>
                  <p className="text-yellow-400 text-lg mb-2">
                    {mentor.professionalTitle}
                  </p>
                  <p className="text-gray-300 text-sm mb-2">{mentor.email}</p>
                  <p className="text-gray-300 text-sm mb-4">
                    {mentor.mobileNumber}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {mentor.yearsOfExperience} Experience
                    </span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {mentor.primaryCategory}
                    </span>
                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                      {mentor.experienceLevel}
                    </span>
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm capitalize">
                      {mentor.userType}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
                    >
                      Request Re-approval
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200">
                      Remove Mentor
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      About
                    </h2>
                    <p className="text-gray-300">{mentor.bio}</p>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-400">
                        Teaching Style
                      </h3>
                      <p className="text-white">{mentor.teachingStyle}</p>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-400">
                        Experience
                      </h3>
                      <p className="text-white">{mentor.experience}</p>
                    </div>
                  </div>

                  {/* Expertise Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-gray-400">
                        Certifications
                      </h3>
                      {mentor.certifications.length > 0 ? (
                        <ul className="list-disc list-inside text-white">
                          {mentor.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400">
                          No certifications provided
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Availability Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Availability & Pricing
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Time Slots
                        </h3>
                        <p className="text-white">
                          {mentor.timeSlots.join(", ") || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Preferred Days
                        </h3>
                        <p className="text-white">
                          {mentor.preferredDays.join(", ") || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Time Zone
                        </h3>
                        <p className="text-white">{mentor.timeZone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Session Pricing
                        </h3>
                        <p className="text-white">
                          {mentor.sessionPrice} {mentor.currency} for{" "}
                          {mentor.sessionDuration} minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Demo Video */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Demo Video
                    </h2>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                      {mentor.demoVideo ? (
                        <video controls className="w-full h-full">
                          <source src={mentor.demoVideo} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="text-gray-400 p-8 text-center">
                          <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <p>No video uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Contact Details Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Contact Details
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Email
                        </h3>
                        <p className="text-white">{mentor.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Email Verified
                        </h3>
                        <p className="text-white">
                          {mentor.emailVerified ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Mobile Number
                        </h3>
                        <p className="text-white">{mentor.mobileNumber}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Created At
                        </h3>
                        <p className="text-white">
                          {mentor.createdAt instanceof Timestamp
                            ? mentor.createdAt.toDate().toLocaleString()
                            : mentor.createdAt || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          User Type
                        </h3>
                        <p className="text-white capitalize">
                          {mentor.userType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Education
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Highest Qualification
                        </h3>
                        <p className="text-white">
                          {mentor.highestQualification}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Languages
                        </h3>
                        <p className="text-white">
                          {mentor.languages.join(", ") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Documents Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Documents
                    </h2>
                    <div className="space-y-3">
                      {mentor.resume ? (
                        <div className="flex items-center justify-between bg-gray-600/50 p-3 rounded">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-white">{mentor.resume}</span>
                          </div>
                          <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            View
                          </a>
                        </div>
                      ) : (
                        <p className="text-gray-400">No resume uploaded</p>
                      )}
                    </div>
                  </div>

                  {/* Social Links Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Social Links
                    </h2>
                    <div className="space-y-3">
                      {mentor.linkedin && (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn Profile
                        </a>
                      )}
                      {mentor.github && (
                        <a
                          href={mentor.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:text-white"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                          GitHub Profile
                        </a>
                      )}
                      {mentor.portfolio && (
                        <a
                          href={mentor.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-24.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                          Portfolio
                        </a>
                      )}
                      {mentor.youtube && (
                        <a
                          href={mentor.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-400 hover:text-red-300"
                        >
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          YouTube Channel
                        </a>
                      )}
                      {!mentor.linkedin &&
                        !mentor.github &&
                        !mentor.portfolio &&
                        !mentor.youtube && (
                          <p className="text-gray-400">
                            No social links provided
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Terms Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
                      Terms & Agreements
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Agreed to Terms
                        </h3>
                        <p className="text-white">
                          {mentor.agreedToTerms ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400">
                          Agreed to NDA
                        </h3>
                        <p className="text-white">
                          {mentor.agreedToNDA ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Re-approval Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Request Re-approval
            </h2>
            <p className="text-gray-300 mb-4">
              Specify the changes {mentor.fullName} needs to make for
              re-approval.
            </p>
            <textarea
              className="w-full h-32 p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
              placeholder="Enter changes needed..."
              value={changesNeeded}
              onChange={(e) => setChangesNeeded(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestReapproval}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ViewMentorDetails;
