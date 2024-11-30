import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import YearSelector from "./YearSelector"; // Import the YearSelector component

const data = [
	{ name: "Jan", Previous: 100000, Current: 200000 },
	{ name: "Feb", Previous: 120000, Current: 250000 },
	{ name: "Mar", Previous: 150000, Current: 300000 },
	{ name: "Apr", Previous: 200000, Current: 350000 },
	{ name: "May", Previous: 250000, Current: 400000 },
	{ name: "Jun", Previous: 300000, Current: 450000 },
	{ name: "Jul", Previous: 350000, Current: 500000 },
	{ name: "Aug", Previous: 400000, Current: 550000 },
	{ name: "Sept", Previous: 450000, Current: 600000 },
	{ name: "Oct", Previous: 500000, Current: 650000 },
	{ name: "Nov", Previous: 550000, Current: 700000 },
	{ name: "Dec", Previous: 600000, Current: 750000 },
];

const OverviewChart = () => {
	return (
		<div className="bg-white p-6 rounded-lg border mt-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold text-gray-800">
					Order Summary Statistics
				</h2>
				<YearSelector /> {/* Add the YearSelector component here */}
			</div>
			<ResponsiveContainer
				width="100%"
				height={400}
			>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="name"
						stroke="#94A3B8"
					/>
					<YAxis stroke="#94A3B8" />
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							borderRadius: "8px",
							padding: "10px",
						}}
					/>
					<Legend
						verticalAlign="top"
						height={36}
					/>
					<Line
						type="monotone"
						dataKey="Previous"
						stroke="#FF6B6B"
						strokeWidth={3}
						dot={false}
					/>
					<Line
						type="monotone"
						dataKey="Current"
						stroke="#10B981"
						strokeWidth={3}
						dot={{ r: 6 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OverviewChart;
