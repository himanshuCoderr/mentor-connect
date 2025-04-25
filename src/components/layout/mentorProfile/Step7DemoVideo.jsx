import React from "react";

const Step7DemoVideo = ({
  data,
  setData,
  newLanguage,
  setNewLanguage,
  addLanguage,
  removeLanguage,
  handleFileUpload,
}) => {
  const teachingStyles = [
    "Hands-on",
    "Lecture-based",
    "Interactive",
    "Project-based",
  ];
  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Other",
  ];

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      {/* Teaching Details Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Teaching Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Teaching Experience
            </label>
            <textarea
              value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              rows={5}
              placeholder="Describe your teaching methodology, experience, and approach..."
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 100 characters describing your teaching background
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Teaching Style
            </label>
            <select
              value={data.teachingStyle}
              onChange={(e) =>
                setData({ ...data, teachingStyle: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
              required
            >
              <option value="" className="text-gray-500">
                Select your teaching style
              </option>
              {teachingStyles.map((style) => (
                <option key={style} value={style} className="text-white">
                  {style}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              Select the style that best describes your approach
            </p>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">02.</span>
          Teaching Languages
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Add Languages
          </label>
          <div className="flex flex-col xs:flex-row gap-2">
            <select
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
            >
              <option value="" className="text-gray-500">
                Select a language
              </option>
              {languages.map((lang) => (
                <option key={lang} value={lang} className="text-white">
                  {lang}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addLanguage}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              Add Language
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {data.languages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 border border-gray-700 px-3 py-1 rounded-full"
              >
                <span className="text-sm text-white">{lang}</span>
                <button
                  type="button"
                  onClick={() => removeLanguage(lang)}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                  aria-label={`Remove ${lang}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            Add all languages you're comfortable teaching in
          </p>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">03.</span>
          Introduction Video
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Demo Video (Optional)
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              {data.demoVideo ? (
                <>
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm text-white">Video uploaded</span>
                </>
              ) : (
                <span className="text-sm text-gray-400">No video uploaded</span>
              )}
            </div>

            <label className="cursor-pointer">
              <span className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700">
                {data.demoVideo ? "Change Video" : "Upload Video"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="video/mp4"
                onChange={(e) => handleFileUpload(e, "demoVideo")}
              />
            </label>
          </div>

          <p className="text-xs text-gray-500">
            Short video introducing yourself (MP4 format, max 5MB)
          </p>
        </div>
      </section>
    </div>
  );
};

export default Step7DemoVideo;
