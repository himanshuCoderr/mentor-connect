import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import React, { useEffect, useState } from "react";
import { db } from "../BACKEND/firebase";
import ApprovedEmail from "../Services/ApprovedEmail";
// import RejectedEmail from "../Services/RejectedEmail";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function AdminDashboardUI() {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    fetchMentorRequests();
  }, []);

  const fetchMentorRequests = async () => {
    const mentorReqSnap = await getDocs(collection(db, "mentorRequest"));
    const usersSnap = await getDocs(collection(db, "users"));

    const usersMap = {};
    usersSnap.forEach((doc) => {
      usersMap[doc.id] = doc.data();
    });

    const pendingMentors = [];
    mentorReqSnap.forEach((doc) => {
      const mentorData = doc.data();
      const userData = usersMap[doc.id];

      if (userData?.userType.toLowerCase() === "pendingmentor") {
        pendingMentors.push({
          id: doc.id,
          userId: doc.id,
          name: userData.name,
          email: userData.email,
          expertise: mentorData.expertise || "N/A",
          bio: mentorData.bio || "N/A",
          userData,
          mentorData,
        });
      }
    });

    setRequests(pendingMentors);
    console.log("Fetched Pending Mentors:", pendingMentors);
  };

  const handleApprove = async (item) => {
    try {
      const uid = item.userId;
      const mergedData = {
        ...item.userData,
        ...item.mentorData,
        userType: "mentor",
        isApproved: true,
        approvedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "mentors", uid), mergedData);
      await updateDoc(doc(db, "users", uid), { userType: "mentor" });
      await ApprovedEmail(item.email, item.name);

      alert(`Approved: ${item.name}`);
      fetchMentorRequests();
    } catch (error) {
      console.error("Approve Error:", error);
    }
  };

  const handleReject = (item) => {
    setSelectedMentor(item);
    setRejectReason("");
    setIsRejectModalOpen(true);
  };

  const handleSendRejection = async () => {
    if (!rejectReason.trim()) {
      alert("Rejection reason is required!");
      return;
    }
    try {
      // await RejectedEmail(
      //   selectedMentor.email,
      //   selectedMentor.name,
      //   rejectReason
      // );
      await deleteDoc(doc(db, "mentorRequest", selectedMentor.userId));
      await updateDoc(doc(db, "users", selectedMentor.userId), {
        userType: "student",
      });
      alert(`Rejected: ${selectedMentor.name}`);
      setIsRejectModalOpen(false);
      setRejectReason("");
      setSelectedMentor(null);
      fetchMentorRequests();
    } catch (error) {
      console.error("Reject Error:", error);
    }
  };

  const approvedMentors = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      expertise: "Python, Machine Learning",
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah@example.com",
      expertise: "JavaScript, React",
    },
  ];

  const allUsers = [
    {
      id: 1,
      name: "User One",
      email: "user1@example.com",
      role: "student",
    },
    {
      id: 2,
      name: "User Two",
      email: "user2@example.com",
      role: "mentor",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Navbar />
      <section className="pt-24 pb-12 min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900">
        <div className="container lg:mt-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/30">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8 tracking-tight">
              Admin Dashboard
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-700 mb-8 overflow-x-auto scrollbar-hide">
              <button
                className={`relative py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 group ${
                  activeTab === "requests"
                    ? "text-yellow-400 border-b-4 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("requests")}
              >
                Pending Requests ({requests.length})
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400/30 transform transition-transform duration-300 ${
                    activeTab === "requests"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </button>
              <button
                className={`relative py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 group ${
                  activeTab === "mentors"
                    ? "text-yellow-400 border-b-4 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("mentors")}
              >
                Approved Mentors ({approvedMentors.length})
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400/30 transform transition-transform duration-300 ${
                    activeTab === "mentors"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </button>
              <button
                className={`relative py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 group ${
                  activeTab === "users"
                    ? "text-yellow-400 border-b-4 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("users")}
              >
                All Users ({allUsers.length})
                <span
                  className={`absolute bottom-0 left-0 w-full h-1 bg-yellow-400/30 transform transition-transform duration-300 ${
                    activeTab === "users"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </button>
            </div>

            {/* Pending Requests Tab */}
            {activeTab === "requests" && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Pending Mentor Requests
                </h3>
                {requests.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg border border-gray-600/20">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-500"
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
                    <p className="text-gray-400 text-lg">No pending requests</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-600/20 transition-all duration-300 hover:border-yellow-400/50 hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-grow">
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 flex items-center">
                              <svg
                                className="w-5 h-5 mr-2 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {request.name}
                            </h4>
                            <p className="text-yellow-400 text-sm sm:text-base mb-3 flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                              </svg>
                              {request.email}
                            </p>
                            <div className="mb-3">
                              <h5 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                Expertise
                              </h5>
                              <p className="text-white text-sm">
                                {request.mentorData.skills + "" || "N/A"}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-xs sm:text-sm font-medium text-gray-300 mb-1">
                                Bio
                              </h5>
                              <p className="text-gray-300 text-sm line-clamp-3">
                                {request.mentorData.bio || "No bio provided"}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            <Link
                              to={`/viewMentorDetails/${request.id}`}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-grow text-center shadow-md hover:shadow-blue-600/30"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleApprove(request)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-grow shadow-md hover:shadow-green-600/30"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex-grow shadow-md hover:shadow-red-600/30"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Approved Mentors Tab */}
            {activeTab === "mentors" && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Approved Mentors
                </h3>
                {approvedMentors.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg border border-gray-600/20">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-500"
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
                    <p className="text-gray-400 text-lg">No approved mentors</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-600/20">
                    <table className="min-w-full bg-gray-700/70 backdrop-blur-sm rounded-xl">
                      <thead className="bg-gray-600/70">
                        <tr>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Expertise
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600/50">
                        {approvedMentors.map((mentor) => (
                          <tr
                            key={mentor.id}
                            className="hover:bg-gray-600/40 transition-colors duration-200"
                          >
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-white font-medium">
                              {mentor.name}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {mentor.email}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {mentor.expertise}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                              <div className="flex space-x-3">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-yellow-500/30">
                                  Edit
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-red-600/30">
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* All Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  All Users
                </h3>
                {allUsers.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg border border-gray-600/20">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-500"
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
                    <p className="text-gray-400 text-lg">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-600/20">
                    <table className="min-w-full bg-gray-700/70 backdrop-blur-sm rounded-xl">
                      <thead className="bg-gray-600/70">
                        <tr>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600/50">
                        {allUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-600/40 transition-colors duration-200"
                          >
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-white font-medium">
                              {user.name}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <span
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-sm ${
                                  user.role === "admin"
                                    ? "bg-purple-600/80 text-white"
                                    : user.role === "mentor"
                                    ? "bg-blue-600/80 text-white"
                                    : "bg-gray-600/80 text-white"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <button
                                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 shadow-md ${
                                  user.role === "admin"
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/30"
                                }`}
                                disabled={user.role === "admin"}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Rejection Modal */}
      {isRejectModalOpen && selectedMentor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-2xl">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 mr-2 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Reject Mentor Request
              </h2>
            </div>
            <p className="text-gray-300 mb-4">
              Specify the reason for rejecting {selectedMentor.name}'s mentor
              request.
            </p>
            <textarea
              className="w-full h-32 p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400 transition-all duration-200 resize-none"
              placeholder="Enter rejection reason..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => {
                  setIsRejectModalOpen(false);
                  setRejectReason("");
                  setSelectedMentor(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-gray-600/30"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRejection}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-red-600/30"
              >
                Send Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default AdminDashboardUI;
