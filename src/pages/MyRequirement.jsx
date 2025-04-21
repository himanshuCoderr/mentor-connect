import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyRequirement() {
  const requirement = {
    title: "Need help with React",
    description:
      "I’m struggling with React hooks and state management. Need a mentor to guide me through a small project.",
    category: "Project Guidance",
    budget: "500",
    budgetType: "Per Hour",
    preferredTime: "Weekdays 5-7 PM",
    file: "project-details.pdf",
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
  };

  const mentor = {
    name: "Sarah Johnson",
    expertise: "Senior React Developer | 10+ years experience",
    availability: "Weekdays 5-7 PM",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* My Requirement Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto lg:mt-8 px-6 max-w-screen-lg">
          <div className="max-w-full sm:max-w-2xl md:max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Card */}
            <div className="bg-gray-700 text-center px-4 py-4 sm:px-8 sm:py-6 border-b border-gray-600">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                My Requirement
              </h2>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Review your submitted details and find a mentor.
              </p>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Title
                    </h3>
                    <p className="text-lg sm:text-xl text-white font-semibold">
                      {requirement.title}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Description
                    </h3>
                    <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                      {requirement.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Preferred Time
                    </h3>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.preferredTime || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Attached File
                    </h3>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.file ? (
                        <a
                          href="#"
                          className="text-yellow-400 hover:text-yellow-300 transition duration-300"
                        >
                          {requirement.file}
                        </a>
                      ) : (
                        "None"
                      )}
                    </p>
                  </div>
                </div>

                {/* Right Column - Additional Details */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Category
                    </h3>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.category}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Budget
                    </h3>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.budget
                        ? `${requirement.budget} Coins`
                        : "Not specified"}
                      {requirement.budget && requirement.budgetType && (
                        <span className="text-gray-400 text-xs sm:text-sm ml-2">
                          ({requirement.budgetType})
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide">
                      Contact Details
                    </h3>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.studentName}
                    </p>
                    <p className="text-base sm:text-lg text-white">
                      {requirement.studentEmail}
                    </p>
                  </div>
                  {/* Find Mentor Button */}
                  <div className="pt-2 sm:pt-4">
                    <button className="w-full sm:w-auto bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-xs sm:text-sm">
                      Find Matching Mentors
                    </button>
                  </div>
                </div>
              </div>

              {/* Mentor Display - Bottom */}
              <div className="mt-6 sm:mt-10 p-4 sm:p-6 bg-gray-700 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                  Matching Mentor
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center">
                    <img
                      src="hg"
                      alt="Mentor Avatar"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-white">
                        {mentor.name}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {mentor.expertise}
                      </p>
                      <p className="text-yellow-400 text-xs sm:text-sm">
                        Available: {mentor.availability}
                      </p>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-transparent border-2 border-yellow-400 text-yellow-400 px-4 py-1 rounded-lg font-semibold hover:bg-yellow-400 hover:text-gray-900 transition duration-300 text-xs sm:text-sm">
                    Contact Mentor
                  </button>
                </div>
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

export default MyRequirement;
