import React from "react";
import "./StatCards.css";

const StatCards = ({ cases, recoveries, deaths, population, capital, region }) => {
  return (
    <div className="stat-card-container">
      <div className="stat-card blue">
        <h4>Total Cases</h4>
        <p>{cases}</p>
      </div>
      <div className="stat-card green">
        <h4>Recoveries</h4>
        <p>{recoveries}</p>
      </div>
      <div className="stat-card red">
        <h4>Deaths</h4>
        <p>{deaths}</p>
      </div>
      <div className="stat-card grey">
        <h4>Population</h4>
        <p>{population}</p>
      </div>
      <div className="stat-card yellow">
        <h4>Capital</h4>
        <p>{capital}</p>
      </div>
      <div className="stat-card purple">
        <h4>Region</h4>
        <p>{region}</p>
      </div>
    </div>
  );
};

export default StatCards;
