import React from "react";

const Step2ExpertiseSkills = ({
  data,
  setData,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  categories,
  experienceLevels,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      {/* Expertise Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Expertise Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Primary Category
            </label>
            <select
              value={data.primaryCategory}
              onChange={(e) =>
                setData({ ...data, primaryCategory: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
              required
            >
              <option value="" className="text-gray-500">
                Select your primary category
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="text-white">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Experience Level
            </label>
            <select
              value={data.experienceLevel}
              onChange={(e) =>
                setData({ ...data, experienceLevel: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
              required
            >
              <option value="" className="text-gray-500">
                Select your experience level
              </option>
              {experienceLevels.map((level) => (
                <option key={level} value={level} className="text-white">
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Years of Experience
            </label>
            <input
              type="number"
              value={data.yearsOfExperience}
              onChange={(e) =>
                setData({ ...data, yearsOfExperience: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              placeholder="e.g. 5"
              min="0"
              required
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">02.</span>
          Your Skills
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Add Skills
          </label>
          <div className="flex flex-col xs:flex-row gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              placeholder="Enter a skill (e.g. React, Python)"
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 w-35 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              Add Skill
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 border border-gray-700 px-3 py-1 rounded-full"
              >
                <span className="text-sm text-white">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            Add at least 3 relevant skills to showcase your expertise
          </p>
        </div>
      </section>
    </div>
  );
};

export default Step2ExpertiseSkills;
