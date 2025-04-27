import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import React, { useEffect, useState } from "react";
import { db } from "../BACKEND/firebase";
import ApprovedEmail from "../Services/ApprovedEmail";
import RejectedEmail from "../Services/RejectedEmail";
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
      await RejectedEmail(
        selectedMentor.email,
        selectedMentor.name,
        rejectReason
      );
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
          <div className="max-w-7xl mx-auto bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-8">
              Admin Dashboard
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-700 mb-8 overflow-x-auto scrollbar-hide">
              <button
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 ${
                  activeTab === "requests"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("requests")}
              >
                Pending Requests ({requests.length})
              </button>
              <button
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 ${
                  activeTab === "mentors"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("mentors")}
              >
                Approved Mentors ({approvedMentors.length})
              </button>
              <button
                className={`py-3 px-4 sm:px-6 font-medium text-sm sm:text-base transition-colors duration-300 ${
                  activeTab === "users"
                    ? "text-yellow-400 border-b-2 border-yellow-400"
                    : "text-gray-400 hover:text-yellow-300"
                }`}
                onClick={() => setActiveTab("users")}
              >
                All Users ({allUsers.length})
              </button>
            </div>

            {/* Pending Requests Tab */}
            {activeTab === "requests" && (
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">
                  Pending Mentor Requests
                </h3>
                {requests.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-lg">No pending requests</p>
                  </div>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {requests.map((request) => (
                      <div
                        key={request.id}
                        className="bg-gray-700/50 backdrop-blur-sm p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex-grow">
                            <h4 className="text-lg sm:text-xl font-semibold text-white mb-2">
                              {request.name}
                            </h4>
                            <p className="text-yellow-400 text-sm sm:text-base mb-3">
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
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex-grow text-center"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleApprove(request)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex-grow"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(request)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200 flex-grow"
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
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">
                  Approved Mentors
                </h3>
                {approvedMentors.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-lg">No approved mentors</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-gray-700/50 backdrop-blur-sm rounded-lg">
                      <thead className="bg-gray-600/50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Expertise
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600/50">
                        {approvedMentors.map((mentor) => (
                          <tr
                            key={mentor.id}
                            className="hover:bg-gray-600/30 transition-colors duration-200"
                          >
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-white">
                              {mentor.name}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {mentor.email}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {mentor.expertise}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">
                              <div className="flex space-x-2">
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors duration-200">
                                  Edit
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors duration-200">
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
                <h3 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">
                  All Users
                </h3>
                {allUsers.length === 0 ? (
                  <div className="text-center py-12 bg-gray-700/50 rounded-lg">
                    <p className="text-gray-400 text-lg">No users found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-gray-700/50 backdrop-blur-sm rounded-lg">
                      <thead className="bg-gray-600/50">
                        <tr>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-200 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-600/50">
                        {allUsers.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-gray-600/30 transition-colors duration-200"
                          >
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-white">
                              {user.name}
                            </td>
                            <td className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <span
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  user.role === "admin"
                                    ? "bg-purple-600 text-white"
                                    : user.role === "mentor"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-600 text-white"
                                }`}
                              >
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 sm:px-6 py-4">
                              <button
                                className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors duration-200 ${
                                  user.role === "admin"
                                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                    : "bg-red-600 hover:bg-red-700 text-white"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-md p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Reject Mentor Request
            </h2>
            <p className="text-gray-300 mb-4">
              Specify the reason for rejecting {selectedMentor.name}'s mentor
              request.
            </p>
            <textarea
              className="w-full h-32 p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-400"
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
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendRejection}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
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
