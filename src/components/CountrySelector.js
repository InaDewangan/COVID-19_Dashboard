import React from "react";

const CountrySelector = ({ countries, selectedCountry, onChange }) => {
  return (
    <select value={selectedCountry} onChange={onChange}>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelector;
