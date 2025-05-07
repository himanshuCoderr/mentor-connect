import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { db } from "../BACKEND/firebase";
import { getDoc, doc } from "firebase/firestore";
import { auth } from "../BACKEND/firebase.js";

function MyRequirement() {
  const [requirement, setRequirement] = useState({});
  const [hasRequirement, setHasRequirement] = useState(false);
  const [loading, setLoading] = useState(true);

  // Static mentor data
  const mentor = {
    name: "Sarah Johnson",
    expertise: "Senior React Developer | 10+ years experience",
    availability: "Weekdays 5-7 PM",
    rating: "4.9",
    sessionsCompleted: "142",
    responseTime: "Usually within 2 hours",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("User not logged in");
          setLoading(false);
          return;
        }
        const uid = user.uid;

        const postReq = await getDoc(doc(db, "requirements", uid));
        if (postReq.exists()) {
          setRequirement(postReq.data());
          setHasRequirement(true);
        } else {
          setHasRequirement(false);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requirement:", error);
        setLoading(false);
      }
    };

    fetchRequirement();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen">
        <div className="container lg:mt-14 mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {hasRequirement ? (
            <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gray-700 px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-600">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  My Requirement
                </h2>
                <p className="text-gray-400 mt-1 text-sm sm:text-base">
                  Review your submitted details and find a mentor.
                </p>
              </div>

              {/* Requirement Details */}
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Requirement Details */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Requirement Details
                      </h3>
                      <p className="text-gray-200 whitespace-pre-line">
                        {requirement.requirementDetails || "Not specified"}
                      </p>
                    </div>

                    {/* Subjects */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Subjects
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {requirement.subjects?.length > 0 ? (
                          requirement.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                            >
                              {subject}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">
                            No subjects specified
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Learning Goals */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Learning Goals
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs text-gray-400">Level</h4>
                          <p className="text-gray-200">
                            {requirement.level || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400">I want to</h4>
                          <p className="text-gray-200">
                            {requirement.iWant || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs text-gray-400">Location</h4>
                          <p className="text-gray-200">
                            {requirement.location || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400">Phone</h4>
                          <p className="text-gray-200">
                            {requirement.phone || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Preferences
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs text-gray-400">Budget</h4>
                          <p className="text-gray-200">
                            {requirement.budget
                              ? `${requirement.budget} ${requirement.budgetCurrency}`
                              : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400">
                            Gender Preference
                          </h4>
                          <p className="text-gray-200">
                            {requirement.genderPreference || "No preference"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400">Languages</h4>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {requirement.languages?.length > 0 ? (
                              requirement.languages.map((lang, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs"
                                >
                                  {lang}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-400">
                                No languages specified
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs text-gray-400">
                            Tutor Location
                          </h4>
                          <p className="text-gray-200">
                            {requirement.tutorLocation || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Files */}
                    <div className="bg-gray-700 p-5 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                        Attached Files
                      </h3>
                      <div className="space-y-2">
                        {requirement.files?.length > 0 ? (
                          requirement.files.map((file, index) => (
                            <div key={index} className="flex items-center">
                              <svg
                                className="w-5 h-5 text-yellow-400 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                />
                              </svg>
                              <a
                                href={file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-200 hover:text-yellow-400 transition"
                              >
                                View File {index + 1}
                              </a>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400">
                            No files attached
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Find Mentor Button */}
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02]">
                      Find Matching Mentors
                    </button>
                  </div>
                </div>

                {/* Mentor Card */}
                <div className="mt-8 bg-gray-700 rounded-lg border border-gray-600 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Suggested Mentor
                  </h3>
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="flex items-center flex-1">
                      <img
                        src={mentor.image}
                        alt="Mentor"
                        className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400 mr-4"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {mentor.name}
                        </h4>
                        <p className="text-gray-300">{mentor.expertise}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-400 mr-2">
                            ⭐ {mentor.rating}
                          </span>
                          <span className="text-gray-400 text-sm">
                            ({mentor.sessionsCompleted} sessions)
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-xs">
                            {mentor.availability}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900 px-6 py-2 rounded-lg font-semibold transition">
                        View Profile
                      </button>
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold transition">
                        Contact Mentor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden text-center">
              <div className="bg-gray-700 rounded-lg p-8 sm:p-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-white mb-2">
                  No Requirements Found
                </h3>
                <p className="text-gray-400 mb-6">
                  You haven't submitted any requirements yet.
                </p>
                <Link
                  to="/postRequirement:id"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-md transform hover:scale-[1.02] transition duration-300"
                >
                  Post a New Requirement
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyRequirement;
