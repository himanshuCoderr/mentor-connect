import React from "react";

const Step5Pricing = ({ data, setData, currencies, currencySymbols }) => {
  const durations = ["30", "45", "60", "90", "120"];

  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      {/* Pricing Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Session Pricing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Session Price
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 py-2 bg-gray-800 border border-r-0 border-gray-700 rounded-l-lg text-gray-300 text-sm">
                {currencySymbols[data.currency] || data.currency}
              </span>
              <input
                type="number"
                value={data.sessionPrice}
                onChange={(e) =>
                  setData({ ...data, sessionPrice: e.target.value })
                }
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-r-lg focus:ring-2 focus:ring-yellow-400 text-white placeholder-gray-500 transition-all"
                placeholder="e.g. 50"
                min="0"
                required
              />
            </div>
            <p className="text-xs text-gray-500">
              Set your hourly or per-session rate
            </p>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Currency
            </label>
            <select
              value={data.currency}
              onChange={(e) => setData({ ...data, currency: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
              required
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency} className="bg-gray-800">
                  {currency} ({currencySymbols[currency] || currency})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-300">
              Session Duration
            </label>
            <select
              value={data.sessionDuration}
              onChange={(e) =>
                setData({ ...data, sessionDuration: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
              required
            >
              {durations.map((duration) => (
                <option key={duration} value={duration} className="bg-gray-800">
                  {duration} minutes
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500">
              Standard duration for one session
            </p>
          </div>
        </div>
      </section>

      {/* Price Summary Section */}
      <section className="p-4 sm:p-6 border-t border-gray-800">
        <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-300 mb-3">
            Price Summary
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Your session rate:</span>
            <span className="font-medium text-white">
              {currencySymbols[data.currency] || data.currency}
              {data.sessionPrice || "0"} per {data.sessionDuration || "60"}{" "}
              minutes
            </span>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            This will be displayed to potential mentees
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step5Pricing;
