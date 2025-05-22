import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts"; // Importing Recharts components for pie chart

// Define colors for each pie section
const COLORS = ["#00C49F", "#FF8042", "#0088FE"];

const PieChartCard = ({ data }) => {
    // Show fallback text if no data is passed
    if (!data || data.length === 0) {
        return <div className="chart-card">No data available</div>;
    }

    return (
        <div className="chart-card">
            <h3>Latest COVID-19 Case Breakdown</h3>

            {/* ResponsiveContainer makes chart responsive to screen size */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data} // Data to visualize
                        labelLine={false} // No line from pie to label
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(1)}%` // Label shows name and percentage
                        }
                        outerRadius={100} // Size of pie
                        fill="#8884d8"
                        dataKey="value" // Field to use from data
                    >
                        {/* Assign colors to each slice of pie */}
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]} // Cycle through COLORS array
                            />
                        ))}
                    </Pie>
                    <Tooltip /> {/* Tooltip on hover */}
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" /> {/* Legend at bottom */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartCard;
