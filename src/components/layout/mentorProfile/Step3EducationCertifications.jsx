import React from "react";

const Step3EducationCertifications = ({
  data,
  setData,
  newCertification,
  setNewCertification,
  addCertification,
  removeCertification,
  handleFileUpload,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      {/* Education Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Education Background
        </h3>
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Highest Qualification
          </label>
          <input
            type="text"
            value={data.highestQualification}
            onChange={(e) => setData({ ...data, highestQualification: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
            placeholder="e.g. Master's in Computer Science"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            List your highest completed degree or education level
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">02.</span>
          Professional Certifications
        </h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Add Certifications
          </label>
          <div className="flex flex-col xs:flex-row gap-2">
            <input
              type="text"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              placeholder="e.g. AWS Certified Solutions Architect"
              onKeyPress={(e) => e.key === "Enter" && addCertification()}
            />
            <button
              type="button"
              onClick={addCertification}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              Add
            </button>
          </div>
          
          <div className="space-y-2 mt-2">
            {data.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
              >
                <span className="text-white">{cert}</span>
                <button
                  type="button"
                  onClick={() => removeCertification(cert)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                  aria-label={`Remove ${cert}`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500">
            Add relevant professional certifications to boost your profile
          </p>
        </div>
      </section>

      {/* Resume Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">03.</span>
          Professional Resume
        </h3>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Upload Resume (Optional)
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              {data.resume ? (
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-sm text-white">Resume uploaded</span>
                </>
              ) : (
                <span className="text-sm text-gray-400">No resume uploaded</span>
              )}
            </div>
            
            <label className="cursor-pointer">
              <span className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium text-white transition-colors border border-gray-700">
                {data.resume ? "Change Resume" : "Upload Resume"}
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, "resume")}
              />
            </label>
          </div>
          
          <p className="text-xs text-gray-500">
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>
      </section>
    </div>
  );
};

export default Step3EducationCertifications;