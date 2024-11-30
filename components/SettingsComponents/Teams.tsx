import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";

interface DataBlockProps {
	number: number;
	label: string;
}

const DataBlock: React.FC<DataBlockProps> = ({ number, label }) => (
	<div className="items-center flex flex-col text-center w-full h-full justify-center border-x">
		<div className="text-4xl font-bold">{number}</div>
		<div className="text-sm">{label}</div>
	</div>
);

const banners = [
	{
		id: "BN-00001",
		dateCreated: "17th July, 2023",
		platform: "User Mobile App",
		startDate: "24th July, 2023",
		endDate: "24th July, 2023",
		status: "Active",
		statusClass: "bg-[#f3ffeb] text-green-700",
	},
	{
		id: "123456789",
		dateCreated: "17th July, 2023",
		platform: "User Web App",
		startDate: "19th July, 2023",
		endDate: "24th July, 2023",
		status: "Inactive",
		statusClass: "bg-red-100 text-red-500",
	},
	{
		id: "70303303",
		dateCreated: "17th July, 2023",
		platform: "User Web App",
		startDate: "19th July, 2023",
		endDate: "24th July, 2023",
		status: "Pending",
		statusClass: "bg-[#ffe3ba] text-[#ff9800]",
	},
	// Add more banner objects as needed
];

const Team: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const itemsPerPage = 7;
	const [isClient, setIsClient] = useState(false);
	const router = useRouter();

	const firstIndex = currentPage * itemsPerPage;
	const lastIndex = Math.min(
		firstIndex + itemsPerPage,
		banners.length
	);
	useEffect(() => {
		setIsClient(true);
	}, []);

	const mainData = banners.slice(firstIndex, lastIndex);

	const numberOfPages = Math.ceil(banners.length / itemsPerPage);

	const numArray = Array.from(
		{ length: numberOfPages },
		(_, index) => index
	);

	const onHandlePageChange = (index: number) => {
		setCurrentPage(index);
	};

	const handleRowClick = (id: string) => {
		router.push(`/banner/${id}`);
	};

	const handleAddBannerClick = () => {
		router.push("banner/create-banner");
	};

	return (
		<div className="p-4">
			<div className="flex justify-between items-center my-4 w-full border h-[100px]">
				<DataBlock
					number={104}
					label="TOTAL"
				/>
				<DataBlock
					number={46}
					label="OWNER"
				/>
				<DataBlock
					number={46}
					label="ADMIN"
				/>
				<DataBlock
					number={46}
					label="FINANCE"
				/>
				<DataBlock
					number={46}
					label="IT SPECIALIST"
				/>
				<DataBlock
					number={46}
					label="OPERATIONS"
				/>
				<DataBlock
					number={5}
					label="SUPPORT"
				/>
			</div>
			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2">Banner ID</th>
						<th className="py-2">Date Created</th>
						<th className="py-2">Platform</th>
						<th className="py-2">Start Date</th>
						<th className="py-2">End Date</th>
						<th className="py-2">Status</th>
						<th className="py-2"></th>
					</tr>
				</thead>
				<tbody>
					{mainData.map((banner, index) => (
						<tr
							key={index}
							className="text-center border-t cursor-pointer"
						>
							<td
								onClick={() => handleRowClick(banner.id)}
								className="py-6"
							>
								{banner.id}
							</td>
							<td
								onClick={() => handleRowClick(banner.id)}
								className="py-6"
							>
								{banner.dateCreated}
							</td>
							<td
								onClick={() => handleRowClick(banner.id)}
								className="py-6"
							>
								{banner.platform}
							</td>
							<td
								onClick={() => handleRowClick(banner.id)}
								className="py-6"
							>
								{banner.startDate}
							</td>
							<td
								onClick={() => handleRowClick(banner.id)}
								className="py-6"
							>
								{banner.endDate}
							</td>
							<td className="px-4 py-2 text-center">
								<div className="flex items-center justify-center">
									<button
										className={`btn-xs w-36 h-9 rounded-full flex items-center justify-center ${banner.statusClass}`}
									>
										{banner.status === "Active" && (
											<div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
										)}
										{banner.status === "Inactive" && (
											<div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
										)}
										{banner.status === "Pending" && (
											<div className="w-3 h-3 bg-[#ff9800] rounded-full mr-2"></div>
										)}

										<span className="font-semibold">
											{banner.status}
										</span>
									</button>
								</div>
							</td>
							<td className="py-2">
								<FaEllipsisVertical />
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{banners.length >= itemsPerPage && (
				<div className="w-full flex justify-between mt-4">
					<p>
						{firstIndex + 1} - {lastIndex} of {banners.length}
					</p>

					<div className="flex items-center rounded-md">
						{numArray.map((el: number, index: number) => (
							<div
								key={index}
								onClick={() => onHandlePageChange(index)}
								className={`w-10 h-10 flex items-center cursor-pointer justify-center border ${
									index === currentPage
										? "bg-[#1da96d] text-white"
										: "bg-white text-black"
								}`}
							>
								{index + 1}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Team;
