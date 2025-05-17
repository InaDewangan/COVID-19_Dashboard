// src/components/LineChartCard.js
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Line chart to show cases, recoveries, deaths by year
const LineChartCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow w-full md:w-2/3">
      <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="cases" stroke="#8884d8" />
        <Line dataKey="recoveries" stroke="#82ca9d" />
        <Line dataKey="deaths" stroke="#ff6b6b" />
      </LineChart>
    </div>
  );
};

export default LineChartCard;
