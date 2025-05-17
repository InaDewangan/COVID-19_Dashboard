// src/components/StatCard.js
import React from "react";

// Reusable card for Total Cases, Recoveries, Deaths
const StatCard = ({ title, value, color }) => {
    const bgColor = {
        blue: "bg-blue-100",
        green: "bg-green-100",
        red: "bg-red-100",
    };

    return (
        <div className={`${bgColor[color]} p-4 rounded shadow w-full md:w-1/3`}>
            <p className="text-gray-600 font-medium">{title}</p>
            <h2 className="text-3xl font-bold">{value}</h2>
        </div>
    );
};

export default StatCard;
