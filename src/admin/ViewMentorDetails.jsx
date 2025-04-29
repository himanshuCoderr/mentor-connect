import { Link, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReApprovalEmail from "../Services/ReApprovalEmail";
import React, { useState, useEffect } from "react";
import { db } from "../BACKEND/firebase";
import { getDoc, Timestamp } from "firebase/firestore";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth } from "../BACKEND/firebase"; // admin ka auth

function ViewMentorDetails() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changesNeeded, setChangesNeeded] = useState("");
  const [fieldsToChange, setFieldsToChange] = useState([]); // naya
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatTimeTo12Hour(timeString) {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  }

  const availableFields = [
    "profilePicture",
    "professionalTitle",
    "bio",
    "skills",
    "primaryCategory",
    "experienceLevel",
    "yearsOfExperience",
    "highestQualification",
    "certifications",
    "resume",
    "timeSlots",
    "preferredDays",
    "timeZone",
    "sessionPrice",
    "currency",
    "sessionDuration",
    "linkedin",
    "github",
    "portfolio",
    "youtube",
    "demoVideo",
    "experience",
    "teachingStyle",
    "languages",
  ];

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
          createdAt: userData.createdAt || mentorData.createdAt || "N/A",
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

  const handleRequestReapproval = async () => {
    if (!changesNeeded.trim() || fieldsToChange.length === 0) {
      alert("Please specify the fields and reason for re-approval.");
      return;
    }

    const adminId = auth.currentUser.uid;
    const mentorRequestRef = doc(db, "mentorRequest", id);

    try {
      // Update Firestore
      await updateDoc(mentorRequestRef, {
        status: "reapproval_pending",
        last_updated: serverTimestamp(),
        updated_by: adminId,
        reapproval_fields: fieldsToChange,
        reapproval_reason: changesNeeded,
      });

      // Prepare Update Link
      const updateLink = `${import.meta.env.VITE_REACT_APP_BASE_URL}/mentorProfileCreate/${id}`;
      console.log("Sending updateLink:", updateLink);

      // Send Re-Approval Email
      await ReApprovalEmail(
        mentor.email,
        mentor.fullName,
        fieldsToChange,
        changesNeeded,
        updateLink
      );

      alert(
        `Re-approval request and email sent successfully to ${mentor.fullName}`
      );
      setChangesNeeded("");
      setFieldsToChange([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error in re-approval process:", error);
      alert(`Failed to process re-approval: ${error.message}`);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white flex justify-center items-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-yellow-400 mb-4"
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
          <p className="text-lg font-medium">Loading mentor details...</p>
        </div>
      </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200 font-sans flex items-center justify-center">
        <div className="bg-gray-800/80 p-8 rounded-xl max-w-md text-center">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-xl text-red-400 mb-2 font-medium">
            {error || "Mentor not found"}
          </p>
          <Link
            to="/adminDashBoard"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mt-4 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-gray-200 font-sans">
      <Navbar />
      <section className="pt-24 pb-12 min-h-screen">
        <div className="container lg:mt-6 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/adminDashBoard"
              className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

            {/* Mentor Profile Card */}
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
              {/* Profile Header */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-blue-600/20"></div>
                <div className="relative px-6 py-8 sm:px-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex-shrink-0 relative">
                    {mentor.profilePhoto ? (
                      <img
                        src={mentor.profilePhoto}
                        alt={mentor.fullName}
                        className="h-36 w-36 rounded-full object-cover border-4 border-gray-700/50 shadow-lg"
                      />
                    ) : (
                      <div className="h-36 w-36 rounded-full bg-gray-700 flex items-center justify-center text-5xl font-bold text-white border-4 border-gray-700/50 shadow-lg">
                        {mentor.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full px-3 py-1 text-xs font-bold shadow-md">
                      {mentor.userType.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </div>
                  <div className="flex-grow space-y-3">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
                        {mentor.fullName}
                      </h1>
                      <p className="text-yellow-400 text-lg font-medium">
                        {mentor.professionalTitle}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-600/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {mentor.yearsOfExperience} yrs exp
                      </span>
                      <span className="bg-purple-600/80 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {mentor.primaryCategory}
                      </span>
                      <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {mentor.experienceLevel}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-md hover:shadow-yellow-600/20"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Request Re-approval
                      </button>
                      <button className="bg-red-600/90 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center shadow-md hover:shadow-red-600/20">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove Mentor
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                  {/* About Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-yellow-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        About & Bio
                      </h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {mentor.bio}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-1">
                          Teaching Style
                        </h3>
                        <p className="text-white font-medium">
                          {mentor.teachingStyle}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-1">
                          Experience
                        </h3>
                        <p className="text-white font-medium">
                          {mentor.experience}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expertise Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-blue-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Expertise
                      </h2>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">
                        Skills & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {mentor.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gray-600/70 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-500/70 transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">
                        Certifications
                      </h3>
                      {mentor.certifications.length > 0 ? (
                        <ul className="space-y-2">
                          {mentor.certifications.map((cert, index) => (
                            <li key={index} className="flex items-start">
                              <svg
                                className="w-4 h-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-white">{cert}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic">
                          No certifications provided
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Availability Section */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-green-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-green-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Availability & Pricing
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-1">
                            Time Slots
                          </h3>
                          <div className="text-white font-medium">
                            {mentor.timeSlots && mentor.timeSlots.length > 0 ? (
                              <ul className="space-y-1">
                                {mentor.timeSlots.map((slot, index) => (
                                  <li key={index}>
                                    {slot.day}:{" "}
                                    {formatTimeTo12Hour(slot.startTime)} -{" "}
                                    {formatTimeTo12Hour(slot.endTime)}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              "Not specified"
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-1">
                            Preferred Days
                          </h3>
                          <p className="text-white font-medium">
                            {mentor.preferredDays.join(", ") || "Flexible"}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-1">
                            Time Zone
                          </h3>
                          <p className="text-white font-medium">
                            {mentor.timeZone}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-400 mb-1">
                            Session Pricing
                          </h3>
                          <p className="text-white font-medium">
                            <span className="text-yellow-400">
                              {mentor.sessionPrice} {mentor.currency}
                            </span>{" "}
                            for {mentor.sessionDuration} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Demo Video */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-red-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-red-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Demo Video
                      </h2>
                    </div>
                    <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                      {mentor.demoVideo ? (
                        <video controls className="w-full h-full rounded-lg">
                          <source src={mentor.demoVideo} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="text-gray-400 p-8 text-center">
                          <svg
                            className="w-12 h-12 mx-auto mb-3 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm">No demo video uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Contact Details Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-purple-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Contact Details
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Email
                        </h3>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          <p className="text-white font-medium">
                            {mentor.email}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Email Verified
                        </h3>
                        <div className="flex items-center">
                          {mentor.emailVerified ? (
                            <>
                              <svg
                                className="w-4 h-4 text-green-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-green-400 font-medium">
                                Verified
                              </span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 text-red-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-red-400 font-medium">
                                Not Verified
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Mobile Number
                        </h3>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <p className="text-white font-medium">
                            {mentor.mobileNumber}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Joined On
                        </h3>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <p className="text-white font-medium">
                            {mentor.createdAt instanceof Timestamp
                              ? mentor.createdAt.toDate().toLocaleDateString()
                              : mentor.createdAt || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Education Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-blue-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-blue-400 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Education
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Highest Qualification
                        </h3>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-400 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                          </svg>
                          <p className="text-white font-medium">
                            {mentor.highestQualification}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Languages
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {mentor.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="bg-gray-600/70 text-white px-2.5 py-1 rounded-full text-xs font-medium"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-green-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-green-400 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Documents
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {mentor.resume ? (
                        <div className="flex items-center justify-between bg-gray-600/30 hover:bg-gray-600/50 p-3 rounded-lg transition-colors duration-200">
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-yellow-400"
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
                            <span className="text-white font-medium truncate max-w-xs">
                              {mentor.resume}
                            </span>
                          </div>
                          <a
                            href={mentor.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 ml-2"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </a>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <svg
                            className="w-8 h-8 mx-auto text-gray-500 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                          <p className="text-gray-400 text-sm">
                            No resume uploaded
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Social Links Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-yellow-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-yellow-400 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Social Links
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {mentor.linkedin ? (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 p-3 bg-gray-600/30 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          <span className="text-sm font-medium">
                            LinkedIn Profile
                          </span>
                        </a>
                      ) : null}

                      {mentor.github ? (
                        <a
                          href={mentor.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-400 hover:text-white p-3 bg-gray-600/30 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                          <span className="text-sm font-medium">
                            GitHub Profile
                          </span>
                        </a>
                      ) : null}

                      {mentor.portfolio ? (
                        <a
                          href={mentor.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-400 hover:text-blue-300 p-3 bg-gray-600/30 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-24.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                            />
                          </svg>
                          <span className="text-sm font-medium">Portfolio</span>
                        </a>
                      ) : null}

                      {mentor.youtube ? (
                        <a
                          href={mentor.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-red-400 hover:text-red-300 p-3 bg-gray-600/30 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5 mr-3"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                          <span className="text-sm font-medium">
                            YouTube Channel
                          </span>
                        </a>
                      ) : null}

                      {!mentor.linkedin &&
                        !mentor.github &&
                        !mentor.portfolio &&
                        !mentor.youtube && (
                          <div className="text-center py-4">
                            <svg
                              className="w-8 h-8 mx-auto text-gray-500 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                            <p className="text-gray-400 text-sm">
                              No social links provided
                            </p>
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Terms & Agreements Card */}
                  <div className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-purple-500/30">
                    <div className="flex items-center mb-4">
                      <div className="w-1.5 h-6 bg-purple-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-bold text-white">
                        Terms & Agreements
                      </h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Agreed to Terms
                        </h3>
                        <div className="flex items-center">
                          {mentor.agreedToTerms ? (
                            <>
                              <svg
                                className="w-4 h-4 text-green-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-green-400 font-medium">
                                Agreed
                              </span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 text-red-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-red-400 font-medium">
                                Not Agreed
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                          Agreed to NDA
                        </h3>
                        <div className="flex items-center">
                          {mentor.agreedToNDA ? (
                            <>
                              <svg
                                className="w-4 h-4 text-green-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-green-400 font-medium">
                                Agreed
                              </span>
                            </>
                          ) : (
                            <>
                              <svg
                                className="w-4 h-4 text-red-400 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-red-400 font-medium">
                                Not Agreed
                              </span>
                            </>
                          )}
                        </div>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl w-full max-w-md border border-gray-700/50">
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-6 bg-yellow-500 rounded-full mr-3"></div>
              <h2 className="text-xl font-bold text-white">
                Request Re-approval
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Specify the changes {mentor.fullName} needs to make for
              re-approval.
            </p>
            <div className="mb-4 max-h-64 overflow-y-auto">
              <label className="block text-gray-300 mb-2">
                Select fields to be changed:
              </label>
              <div className="space-y-2">
                {availableFields.map((field) => (
                  <label key={field} className="flex items-center">
                    <input
                      type="checkbox"
                      value={field}
                      checked={fieldsToChange.includes(field)}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldsToChange((prev) =>
                          prev.includes(value)
                            ? prev.filter((item) => item !== value)
                            : [...prev, value]
                        );
                      }}
                      className="mr-2 h-4 w-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                    />
                    <span className="text-white">{field}</span>
                  </label>
                ))}
              </div>
            </div>
            <textarea
              className="w-full h-32 p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400 resize-none"
              placeholder="Enter changes needed..."
              value={changesNeeded}
              onChange={(e) => setChangesNeeded(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestReapproval}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
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
