import React from "react";
import { signOut } from "firebase/auth";

function PendingMentor() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error.message);
      alert("Logout failed: " + error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-md max-w-md text-center">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Mentor Request Under Review 📝
        </h2>
        <p className="text-gray-300 text-base">
          Thank you for submitting your mentor profile! Your request is
          currently under review. You will be notified via email once your
          profile is approved. Please check back later.
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default PendingMentor;
