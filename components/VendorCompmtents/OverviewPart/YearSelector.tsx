import React, { useState } from "react";

const YearSelector = () => {
	const [selectedYear, setSelectedYear] = useState("thisYear");
	const [customYear, setCustomYear] = useState("");

	const handleYearChange = (event) => {
		setSelectedYear(event.target.value);
	};

	return (
		<div className="relative w-64">
			<div className="relative">
				<select
					value={selectedYear}
					onChange={handleYearChange}
					className="block w-full px-4 py-2 pr-8 bg-gray-200 text-gray-800 border border-gray-300 rounded-md leading-tight focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
				>
					<option value="thisYear">This Year</option>
					<option value="lastYear">Last Year</option>
					<option value="custom">Custom</option>
				</select>
			</div>

			{selectedYear === "custom" && (
				<div className="absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-lg p-4 z-40">
					<input
						type="text"
						placeholder="Enter Year"
						value={customYear}
						onChange={(e) => setCustomYear(e.target.value)}
						className="block w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 transition duration-150 ease-in-out"
					/>
					<button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-150 ease-in-out">
						Apply
					</button>
				</div>
			)}
		</div>
	);
};

export default YearSelector;
