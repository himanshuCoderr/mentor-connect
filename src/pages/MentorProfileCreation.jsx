import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function MentorProfileCreation() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <Navbar />

      {/* Mentor Profile Creation Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Header Card */}
            <div className="bg-gray-700 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-gray-600">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Create Your Mentor Profile</h2>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">Complete the steps below to become a mentor.</p>

              {/* Step Indicator */}
              <div className="flex mt-3 sm:mt-4 space-x-2 sm:space-x-4 overflow-x-auto">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${currentStep === 1 ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  Step 1: Basic Info
                </button>
                <button
                  onClick={() => currentStep > 1 && setCurrentStep(2)}
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${currentStep === 2 ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  Step 2: Teaching Preferences
                </button>
                <button
                  onClick={() => currentStep > 2 && setCurrentStep(3)}
                  className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${currentStep === 3 ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  Step 3: Review & Submit
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Step 1: Basic Information</h3>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      id="experience"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="e.g., 10+ years"
                    />
                  </div>

                  {/* Skills */}
                  <div>
                    <label htmlFor="skills" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="e.g., React, Node.js, JavaScript"
                    />
                  </div>

                  {/* Pricing */}
                  <div>
                    <label htmlFor="pricing" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Pricing (per hour)
                    </label>
                    <input
                      type="text"
                      id="pricing"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="e.g., 50 Coins"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-end gap-3 sm:gap-4">
                    <button
                      onClick={nextStep}
                      className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Teaching Preferences */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Step 2: Teaching Preferences</h3>

                  {/* Teaching Style */}
                  <div>
                    <label htmlFor="teachingStyle" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Teaching Style
                    </label>
                    <textarea
                      id="teachingStyle"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="Describe your teaching style (e.g., Interactive, hands-on coding sessions)"
                      rows="4"
                    />
                  </div>

                  {/* Available Time Slots */}
                  <div>
                    <label htmlFor="availableTimeSlots" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Available Time Slots
                    </label>
                    <input
                      type="text"
                      id="availableTimeSlots"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="e.g., Weekdays 5-7 PM, Weekends 10 AM - 1 PM"
                    />
                  </div>

                  {/* Languages */}
                  <div>
                    <label htmlFor="languages" className="block text-xs sm:text-sm text-gray-400 font-medium uppercase tracking-wide mb-1 sm:mb-2">
                      Languages
                    </label>
                    <input
                      type="text"
                      id="languages"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition duration-300 text-sm sm:text-base"
                      placeholder="e.g., English, Hindi"
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-end gap-3 sm:gap-4">
                    <button
                      onClick={prevStep}
                      className="bg-gray-600 text-gray-200 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold hover:bg-gray-500 transition duration-300 text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      onClick={nextStep}
                      className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review and Submit */}
              {currentStep === 3 && (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">Step 3: Review & Submit</h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Please review your details before submitting. You can go back to any step to make changes.
                  </p>

                  {/* Review Card */}
                  <div className="bg-gray-700 p-4 sm:p-6 rounded-lg space-y-3 sm:space-y-4">
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">Basic Information</h4>
                      <p className="text-gray-200 text-sm sm:text-base">Name: Sarah Johnson</p>
                      <p className="text-gray-200 text-sm sm:text-base">Experience: 10+ years</p>
                      <p className="text-gray-200 text-sm sm:text-base">Skills: React, Node.js, JavaScript</p>
                      <p className="text-gray-200 text-sm sm:text-base">Pricing: 50 Coins</p>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-yellow-400 text-xs sm:text-sm hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-white">Teaching Preferences</h4>
                      <p className="text-gray-200 text-sm sm:text-base">Teaching Style: Interactive, hands-on coding sessions</p>
                      <p className="text-gray-200 text-sm sm:text-base">Available Time Slots: Weekdays 5-7 PM, Weekends 10 AM - 1 PM</p>
                      <p className="text-gray-200 text-sm sm:text-base">Languages: English, Hindi</p>
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="text-yellow-400 text-xs sm:text-sm hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-400 text-xs sm:text-sm">
                    Your profile will be reviewed for approval. Only genuine mentors will be approved.
                  </p>

                  {/* Navigation Buttons */}
                  <div className="flex justify-end gap-3 sm:gap-4">
                    <button
                      onClick={prevStep}
                      className="bg-gray-600 text-gray-200 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold hover:bg-gray-500 transition duration-300 text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-1 sm:py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transform hover:scale-105 transition duration-300 text-sm sm:text-base"
                    >
                      Submit for Approval
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MentorProfileCreation;