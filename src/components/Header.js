// src/components/Header.js
import React from "react";

const Header = ({ countries, selectedCountry, setSelectedCountry }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      {/* Search input (not functional for now) */}
      <input
        type="text"
        placeholder="Search Country"
        className="border p-2 rounded w-full md:w-auto"
      />

      {/* Country Dropdown */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="border p-2 rounded"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {/* Date Range Input (static for now) */}
      <input type="text" value="24-10-2022 - 09-12-2023" readOnly className="border p-2 rounded" />
    </div>
  );
};

export default Header;
