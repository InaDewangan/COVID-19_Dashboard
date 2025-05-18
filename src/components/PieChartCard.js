import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

const PieChartCard = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="chart-card">No data available</div>;
    }

    return (
        <div className="chart-card">
            <h3>Latest COVID-19 Case Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartCard;
