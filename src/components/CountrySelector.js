import React from "react";

// Dropdown component to select a country
const CountrySelector = ({ countries, selectedCountry, onChange }) => {
  return (
    // Select element that shows currently selected country and handles changes
    <select value={selectedCountry} onChange={onChange}>
      {/* Loop through each country and create an option */}
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} {/* Display country name in dropdown */}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
