import React from "react";

const Step1BasicInfo = ({ data, setData, handleFileUpload }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in divide-y divide-gray-800 border border-gray-800">
      {/* Personal Info Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              required
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Professional Title
            </label>
            <input
              type="text"
              value={data.professionalTitle}
              onChange={(e) =>
                setData({ ...data, professionalTitle: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              placeholder="Senior Frontend Developer"
              required
            />
          </div>
        </div>
      </section>

      {/* Profile Picture Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">02.</span>
          Profile Image
        </h3>

        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden shadow-sm">
              {data.profilePicture ? (
                <img
                  src={data.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="cursor-pointer">
              <span className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700">
                Upload Photo
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "profilePicture")}
              />
            </label>
            <p className="text-xs text-gray-500 pt-3">
              Recommended: 400×400px JPG/PNG (max 2MB)
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">03.</span>
          Professional Bio
        </h3>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            About Yourself
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => setData({ ...data, bio: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
            rows={5}
            placeholder="Describe your professional background, skills, and expertise..."
            required
          />
          <p className="text-xs text-gray-500">
            Minimum 100 characters. This will be displayed on your public
            profile.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Step1BasicInfo;
