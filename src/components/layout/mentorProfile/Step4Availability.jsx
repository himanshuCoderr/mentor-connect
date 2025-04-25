import React from "react";

const Step4Availability = ({
  data,
  setData,
  newSlot,
  setNewSlot,
  addTimeSlot,
  removeTimeSlot,
  days,
}) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-xl animate-fade-in border border-gray-800">
      {/* Time Zone Section */}
      <section className="p-4 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">01.</span>
          Time Zone
        </h3>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-300">
            Your Time Zone
          </label>
          <select
            value={data.timeZone}
            onChange={(e) => setData({ ...data, timeZone: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400 text-white transition-all"
            required
          >
            {Intl.supportedValuesOf("timeZone").map((zone) => (
              <option
                key={zone}
                value={zone}
                className="text-white bg-gray-800"
              >
                {zone}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            Select your current time zone for accurate scheduling
          </p>
        </div>
      </section>

      {/* Preferred Days Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">02.</span>
          Preferred Working Days
        </h3>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Select your available days
          </label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => {
                  const newDays = data.preferredDays.includes(day)
                    ? data.preferredDays.filter((d) => d !== day)
                    : [...data.preferredDays, day];
                  setData({ ...data, preferredDays: newDays });
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors ${
                  data.preferredDays.includes(day)
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white"
                }`}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Select all days you're typically available for mentoring
          </p>
        </div>
      </section>

      {/* Time Slots Section */}
      <section className="p-4 sm:p-6 space-y-4 border-t border-gray-800">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          <span className="text-yellow-400 mr-2">03.</span>
          Available Time Slots
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  Day
                </label>
                <select
                  value={newSlot.day}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, day: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white transition-all"
                >
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, startTime: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-300">
                  End Time
                </label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, endTime: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white transition-all"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={addTimeSlot}
              disabled={newSlot.startTime >= newSlot.endTime}
              className={`w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors shadow-sm ${
                newSlot.startTime >= newSlot.endTime
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Add Time Slot
            </button>
          </div>

          {data.timeSlots.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300">
                Your Scheduled Availability:
              </h4>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 divide-y divide-gray-700">
                {data.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <div className="text-white">
                      <span className="font-medium">{slot.day}</span>:{" "}
                      {slot.startTime} - {slot.endTime}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="text-red-400 hover:text-red-300 transition-colors text-sm"
                      aria-label={`Remove ${slot.day} time slot`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Step4Availability;
