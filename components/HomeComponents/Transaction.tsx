const transactions = [
	{
		date: "31st July, 2023",
		vendor: "NIKE",
		amount: "₦50,000,000",
		cashbackPercent: "10%",
		cashbackEarned: "₦10,000,000",
		status: "DECLINE",
		statusClass: "bg-red-100 text-red-500",
	},
	{
		date: "31st July, 2023",
		vendor: "H&M",
		amount: "₦10,000,000",
		cashbackPercent: "8%",
		cashbackEarned: "₦30,000,000",
		status: "COMPLETED",
		statusClass: "bg-[#f3ffeb] text-green-700",
	},
	{
		date: "31st July, 2023",
		vendor: "APPLE",
		amount: "₦10,000,000",
		cashbackPercent: "2.2%",
		cashbackEarned: "₦30,000,000",
		status: "DECLINE",
		statusClass: "bg-red-100 text-red-500",
	},
	{
		date: "31st July, 2023",
		vendor: "PUMA",
		amount: "₦10,000,000",
		cashbackPercent: "7%",
		cashbackEarned: "₦30,000,000",
		status: "ACTIVE",
		statusClass: "bg-[#f4f7fa] text-blue-700",
	},
];

const Transaction = () => {
	return (
		<div className="mt-7">
			<div className="flex justify-between items-center mb-5 border-b-2 pb-2">
				<div className="font-bold text-lg">Transaction History</div>
				<div className="text-green-600 font-bold cursor-pointer">
					View All Transaction History
				</div>
			</div>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="w-full border-b text-[#494a53]">
							<th className="px-4 py-2 text-center">Date</th>
							<th className="px-4 py-2 text-center">Vendor</th>
							<th className="px-4 py-2 text-center">Amount</th>
							<th className="px-4 py-2 text-center">Cashback%</th>
							<th className="px-4 py-2 text-center">
								Cashback Earned
							</th>
							<th className="px-4 py-2 text-center">Status</th>
						</tr>
					</thead>
					<tbody>
						{transactions.map((transaction, index) => (
							<tr
								className="border-b text-[#494a53]"
								key={index}
							>
								<td className="px-4 py-2 text-center">
									<div className="text-[13px] font-semibold">
										{transaction.date}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[13px]">
											{transaction.vendor}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[13px]">
											{transaction.amount}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[13px]">
											{transaction.cashbackPercent}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center font-semibold text-[13px]">
									{transaction.cashbackEarned}
								</td>
								<td className="px-4 py-2 text-center">
									<button
										className={`btn-xs w-36 h-9 rounded-full flex items-center justify-center ${transaction.statusClass}`}
									>
										{transaction.status === "COMPLETED" && (
											<div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
										)}
										{transaction.status === "DECLINE" && (
											<div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
										)}
										{transaction.status === "ACTIVE" && (
											<div className="w-3 h-3 bg-blue-700 rounded-full mr-2"></div>
										)}
										<span className="font-semibold">
											{transaction.status}
										</span>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Transaction;
