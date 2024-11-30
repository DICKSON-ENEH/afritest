import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterDropDown: React.FC = () => {
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [activeTab, setActiveTab] = useState<string>("30 days");
	const [status, setStatus] = useState<string>("Completed");

	const handleReset = () => {
		setStartDate(new Date());
		setEndDate(new Date());
		setStatus("Completed");
	};

	// const handleApply = () => {
	// 	console.log("Date Range:", startDate, endDate);
	// 	console.log("Status:", status);
	// };

	return (
		<div className="w-full max-w-lg mx-auto mt-7 h-full p-8 border rounded bg-white z-40">
			<div className="flex justify-between mb-5 border-b-2 pb-2">
				<div className="flex justify-around mb-5">
					{["Today", "Last 7 days", "30 days", "1 year"].map(
						(tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-2 ${
									activeTab === tab ? "text-green-600 font-bold" : ""
								}`}
							>
								{tab}
							</button>
						)
					)}
				</div>
			</div>
			<div className="mb-4">
				<div className="text-lg font-medium mb-2">
					Custom date range
				</div>
				<div className="flex gap-4">
					<DatePicker
						selected={startDate}
						onChange={(date: Date | null) => setStartDate(date)}
						className="border p-2 rounded"
					/>
					<DatePicker
						selected={endDate}
						onChange={(date: Date | null) => setEndDate(date)}
						className="border p-2 rounded"
					/>
				</div>
			</div>
			<div className="mb-4">
				<div className="text-lg font-medium mb-2">Status</div>
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="border p-2 rounded w-full"
				>
					<option value="Completed">Completed</option>
					<option value="Pending">Pending</option>
					<option value="Cancelled">Cancelled</option>
				</select>
			</div>
			<div className="flex justify-end gap-4">
				<button
					onClick={handleReset}
					className="px-4 py-2 border rounded bg-gray-200"
				>
					Reset
				</button>
				<button
					// onClick={handleApply}
					className="px-4 py-2 border rounded bg-green-500 text-white"
				>
					Apply
				</button>
			</div>
		</div>
	);
};

export default FilterDropDown;
