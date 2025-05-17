// src/components/PieChartCard.js
import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

// Pie chart to show recoveries, deaths & other (from total)
const PieChartCard = ({ total }) => {
    const data = [
        { name: "Recoveries", value: 4200000 },
        { name: "Deaths", value: 200000 },
        { name: "Other", value: total - 4200000 - 200000 },
    ];

    const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];

    return (
        <div className="bg-white p-4 rounded shadow w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
            <PieChart width={300} height={300}>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
                    {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default PieChartCard;
