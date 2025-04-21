import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { db } from "../BACKEND/firebase.js";
import { setDoc, doc } from "firebase/firestore";

function RequestMentorship() {
  const navigate = useNavigate();

  const [requirement, setRequirement] = useState({
    requirementTitle: "",
    category: "",
    budget: "",
    budgetType: "",
    preferredTime: "",
    attachFile: "",
    name: "",
    email: "",
    description: "",
  });

  async function handleSubmitForm() {
    try {
      const requirementId = Date.now().toString();
      await setDoc(doc(db, "requirements", requirementId), requirement);
      console.log("Requirement submitted:", requirement);

      navigate(`/myRequirement`);

      setRequirement({
        requirementTitle: "",
        category: "",
        budget: "",
        budgetType: "",
        preferredTime: "",
        attachFile: "",
        name: "",
        email: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting requirement:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Request Mentorship Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-24 pb-20 min-h-screen flex items-center">
        <div className="container lg:mt-8 mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-xl shadow-lg">
            <h2 className="text-4xl font-bold text-center text-white mb-2">
              Request Mentorship
            </h2>
            <p className="text-center text-gray-400 mb-10">
              Fill out the details below to connect with a mentor.
            </p>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitForm();
              }}
            >
              {/* Left Column */}
              <div className="space-y-6">
                {/* Requirement Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Requirement Title *
                  </label>
                  <input
                    type="text"
                    value={requirement.requirementTitle}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    onChange={(e) => {
                      setRequirement({
                        ...requirement,
                        requirementTitle: e.target.value,
                      });
                    }}
                    placeholder="e.g., Need help with React"
                    required
                  />
                </div>

                {/* Category Select */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Category *
                  </label>
                  <select
                    value={requirement.category}
                    onChange={(e) => {
                      setRequirement({
                        ...requirement,
                        category: e.target.value,
                      });
                    }}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="mentorship">Mentorship</option>
                    <option value="assignment-help">Assignment Help</option>
                    <option value="live-coding">Live Coding Session</option>
                    <option value="project-guidance">Project Guidance</option>
                    <option value="exam-prep">Exam Preparation</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Budget (Optional)
                  </label>
                  <input
                    type="number"
                    id="budget"
                    value={requirement.budget}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    onChange={(e) => {
                      setRequirement({
                        ...requirement,
                        budget: e.target.value,
                      });
                    }}
                    required
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Preferred Time */}
                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Preferred Time (Optional)
                  </label>
                  <input
                    type="text"
                    value={requirement.preferredTime}
                    onChange={(e) => {
                      setRequirement({
                        ...requirement,
                        preferredTime: e.target.value,
                      });
                    }}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                    placeholder="e.g., Weekdays 5-7 PM"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label
                    htmlFor="file"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Attach File (Optional)
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      setRequirement({
                        ...requirement,
                        attachFile: e.target.value,
                      });
                    }}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  />
                </div>

                {/* Budget Type*/}
                <div>
                <p
                    htmlFor="budget"
                    className="block text-sm text-gray-300 mb-2 font-medium"
                  >
                    Budget Type
                  </p>
                <select
                    value={requirement.budgetType}
                    onChange={(e) =>
                      setRequirement({
                        ...requirement,
                        budgetType: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
                  >
                    <option value="" disabled>
                      Budget Type
                    </option>
                    <option value="per-hour">Per Hour</option>
                    <option value="per-day">Per Day</option>
                    <option value="per-week">Per Week</option>
                    <option value="per-month">Per Month</option>
                    <option value="per-work">Per Work</option>
                  </select>
                </div>
              </div>

              {/* Description (Full Width) */}
              <div className="md:col-span-2">
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-300 mb-2 font-medium"
                >
                  Description *
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300"
                  placeholder="Describe what you need help with..."
                  value={requirement.description}
                  rows="5"
                  required
                  onChange={(e) => {
                    setRequirement({
                      ...requirement,
                      description: e.target.value,
                    });
                  }}
                />
              </div>

              {/* Submit Button (Full Width) */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-500 transform hover:scale-105 transition duration-300"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RequestMentorship;
