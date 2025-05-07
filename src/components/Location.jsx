// LocationInput.jsx
import React, { useState } from "react";
import axios from "axios";

const GEOAPIFY_API_KEY = "577d204d102444dcb3b814c90abb389e"; // replace with your key

function LocationInput({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    onChange(input);

    if (value.trim() !== "" && input.length > 2) {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          input
        )}&apiKey=${GEOAPIFY_API_KEY}`
      );
      setSuggestions(res.data.features);
      console.log(res.data.features);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    onChange(place.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter your location"
        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-gray-800 border border-gray-600 w-full mt-1 max-h-60 overflow-y-auto rounded-md shadow-lg">
          {suggestions.map((place, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-yellow-400 hover:text-black cursor-pointer text-sm"
              onClick={() => handleSelect(place)}
            >
              {place.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
