import React from "react";

const Step6SocialPortfolio = ({ data, setData }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      <div className="p-4 sm:p-6 space-y-6">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Social & Portfolio Links
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* LinkedIn Profile */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              LinkedIn Profile
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg text-gray-400 text-sm">
                linkedin.com/in/
              </span>
              <input
                type="text"
                value={data.linkedin}
                onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
                placeholder="your-profile"
              />
            </div>
            <p className="text-xs text-gray-500">
              Your LinkedIn profile username
            </p>
          </div>

          {/* GitHub Profile */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              GitHub Profile
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg text-gray-400 text-sm">
                github.com/
              </span>
              <input
                type="text"
                value={data.github}
                onChange={(e) => setData({ ...data, github: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
                placeholder="your-username"
              />
            </div>
            <p className="text-xs text-gray-500">
              Your GitHub username
            </p>
          </div>

          {/* Portfolio Website */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Portfolio Website
            </label>
            <input
              type="url"
              value={data.portfolio}
              onChange={(e) => setData({ ...data, portfolio: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
              placeholder="https://your-portfolio.com"
            />
            <p className="text-xs text-gray-500">
              Full URL to your portfolio
            </p>
          </div>

          {/* YouTube Channel */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              YouTube Channel
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg text-gray-400 text-sm">
                youtube.com/
              </span>
              <input
                type="text"
                value={data.youtube}
                onChange={(e) => setData({ ...data, youtube: e.target.value })}
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
                placeholder="channel/your-channel"
              />
            </div>
            <p className="text-xs text-gray-500">
              Your YouTube channel path
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step6SocialPortfolio;