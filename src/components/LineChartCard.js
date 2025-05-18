import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./ChartCard.css";

const LineChartCard = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <div className="chart-card">No chart data available.</div>;
  }

  return (
    <div className="chart-card">
      <h3>COVID Cases Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 50, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Blue for total cases */}
          <Line type="monotone" dataKey="cases" stroke="#3366ff" strokeWidth={2} />
          {/* Green for recoveries */}
          <Line type="monotone" dataKey="recovered" stroke="#33cc66" strokeWidth={2} />
          {/* Red for deaths */}
          <Line type="monotone" dataKey="deaths" stroke="#ff4d4d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;
