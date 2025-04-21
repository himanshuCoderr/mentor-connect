import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../BACKEND/firebase"; // apna firebase config path daal do

function RequirementDetail() {
  const { requirementId } = useParams();
  const [requirement, setRequirement] = useState(null);
  const [error, setError] = useState(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!requirementId) {
      setError("No requirement ID provided");
      return;
    }

    const unsub = onSnapshot(
      doc(db, "requirements", requirementId),
      (docSnap) => {
        if (docSnap.exists()) {
          setRequirement({ id: docSnap.id, ...docSnap.data() });
          setError(null);
        } else {
          setError("Requirement not found");
          setRequirement(null);
        }
      },
      (error) => {
        console.error("Error fetching requirement:", error);
        setError("Failed to load requirement");
      }
    );

    return () => unsub();
  }, [requirementId]);

  // Date formatting function
  const formatDate = (createdAt) => {
    if (!createdAt) return "Date not available";
    try {
      // Firebase Timestamp ke liye
      if (createdAt.seconds) {
        return new Date(createdAt.seconds * 1000).toLocaleDateString();
      }
      // Normal Date object ke liye
      return new Date(createdAt).toLocaleDateString();
    } catch (e) {
      return "Invalid date";
    }
  };

  // Loading state
  if (!requirement && !error) {
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-yellow-400 mb-4">{error}</h1>
          <Link
            to="/mentorDashboard"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto p-6">
        <Link
          to="/mentorDashboard"
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to all requests
        </Link>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {requirement.requirementTitle || "No Title"}
                </h1>
                <div className="flex items-center mt-2 gap-3">
                  <span className="bg-blue-900/50 text-blue-400 px-3 py-1 rounded-full text-sm">
                    {requirement.category || "No Category"}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Posted: {formatDate(requirement.createdAt)}
                  </span>
                </div>
              </div>
              <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-bold text-lg">
                {requirement.budget || "0"} Coins
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                    Description
                  </h2>
                  <p className="text-gray-300 whitespace-pre-line">
                    {requirement.description || "No description provided"}
                  </p>
                </div>

                {requirement.file && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                      Attached File
                    </h2>
                    <a
                      href={requirement.file}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 border border-yellow-400 rounded-lg px-4 py-2"
                      download
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {requirement.fileName || "Download File"}
                    </a>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                    Student Details
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-medium">
                        {requirement.name || "Anonymous"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium text-yellow-400">
                        {requirement.email || "No email provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Preferred Time</p>
                      <p className="font-medium">
                        {requirement.preferredTime || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4 text-yellow-400">
                    Connect with Student
                  </h2>
                  <p className="text-gray-300 mb-4">
                    You'll need to pay {60} coins to contact this student
                  </p>
                  <button
                    onClick={() => setShowContact(!showContact)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    Contact Student ({60} Coins)
                  </button>
                  {showContact && (
                    <p className="text-gray-300 mt-4">
                      Mobile Number : 9874635249
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequirementDetail;

// title: "Need help with React",
// description:
//   "I’m struggling with React hooks and state management. Need a mentor to guide me through a small project.",
// category: "Project Guidance",
// budget: "500",
// budgetType: "Per Hour",
// preferredTime: "Weekdays 5-7 PM",
// file: "project-details.pdf",
// studentName: "John Doe",
// studentEmail: "john.doe@example.com",
