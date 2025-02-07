import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useGetVendorsQuery } from "../../../redux/services/vendorApi";
// import { useGetVendorsQuery } from "@/Redux/services/vendorApi";
// import { VendorInfo } from "@/utils/types";
//  import { useGetVendorsQuery } from "@/Redux/services/vendorApi";
//  import { VendorInfo } from "@/utils/types";
export interface StoreItem {
	ownerName: string;
	email: string;
	storeName: string;
	storeId: string;
	dateJoined: string;
	status: string;
	statusClass: string;
}

// const allStores: StoreItem[] = [
// 	{
// 		ownerName: "Moses Jacob",
// 		email: "mosesjacob@gmail.com",
// 		storeName: "Nike",
// 		storeId: "AFR-0023",
// 		dateJoined: "29th July, 2024",
// 		status: "Active",
// 		statusClass: "bg-[#f3ffeb] text-green-700",
// 	},
// 	{
// 		ownerName: "Dickson Jacob",
// 		email: "mosesjacob@gmail.com",
// 		storeName: "Nike",
// 		storeId: "AFR-0024",
// 		dateJoined: "29th July, 2024",
// 		status: "Rejected",
// 		statusClass: "bg-red-100 text-red-500",
// 	},
// 	{
// 		ownerName: "Badmus Ola",
// 		email: "mosesjacob@gmail.com",
// 		storeName: "Nike",
// 		storeId: "AFR-0025",
// 		dateJoined: "29th July, 2024",
// 		status: "Disabled",
// 		statusClass: "bg-[#f4f7fa] text-[#494a53]",
// 	},
// 	{
// 		ownerName: "Rufai Ahmed",
// 		email: "mosesjacob@gmail.com",
// 		storeName: "Nike",
// 		storeId: "AFR-0026",
// 		dateJoined: "29th July, 2024",
// 		status: "Awaiting Approval",
// 		statusClass: "bg-[#ffe3ba] text-[#ff9800]",
// 	},
// 	// Repeat these entries to create 25 items for pagination demo
// ];

const AllStores: React.FC = () => {

	const {data:allStores} = useGetVendorsQuery()

	// console.log(allStores?.data?.vendors) 
	const [showDropdown, setShowDropdown] = useState<number | null>(
		null
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [filter, setFilter] = useState<string>("All stores");

	const itemsPerPage = 10;

	//@ts-ignore
	const totalPages = Math.ceil(allStores?.data?.vendors?.length / itemsPerPage);

	const toggleDropdown = (index: number) => {
		setShowDropdown((prev) => (prev !== null ? null : index));
	};

	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const handleFilterChange = (filter: string) => {
		setFilter(filter);
		setCurrentPage(1);
	};
//@ts-ignore
	const filteredStores = allStores?.data?.vendors?.filter((store:any) => {
		if (filter === "All stores") return true;
		return store.status === filter;
	});
	console.log("this is filtered", filteredStores)

	const paginatedStores = filteredStores?.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	console.log("this is paginated", paginatedStores)
	return (
		<div className="mt-7">
			{/* Title and Switcher */}
			<h1 className="text-2xl font-semibold">Stores</h1>
			<div className="flex flex-wrap justify-between items-center mb-4">
				<div className="flex flex-1 space-x-6 ml-8">
					{[
						"All stores",
						"Awaiting Approval",
						"Active",
						"Rejected",
						"Disabled",
					].map((status) => (
						<div
							key={status}
							className={`${
								filter === status
									? "text-green-600 border-b-2 border-green-600"
									: "text-gray-600"
							} text-[13px] cursor-pointer transition-colors duration-300 ease-in-out`}
							onClick={() => handleFilterChange(status)}
						>
							{status}
						</div>
					))}
				</div>
				<div className="flex space-x-4 mt-4 md:mt-0">
					<Link href="/addstore">
						<button className="px-4 py-2 bg-green-600 text-white rounded-md">
							+ Add New Store
						</button>
					</Link>
				</div>
			</div>

			{/* Table */}
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="w-full border-b text-[#494a53]">
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Owner Name
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Email Address
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Store Name
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Store ID
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Date Joined
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Status
							</th>
							<th className="px-4 py-2 text-center text-sm md:text-sm lg:text-sm">
								Action
							</th>
						</tr>
					</thead>
					 <tbody>
						  {paginatedStores?.map((store:any, index:number) => (
							<tr
								key={index}
								className="border-b text-[#494a53] hover:bg-gray-100"
							>
								<td className="px-4 py-2 text-center">
									<div className="font-semibold text-[13px]">
										{store?.owner_details?.first_name} { " "}  {store?.owner_details?.last_name}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="font-semibold text-[13px]">
										{store.owner_details?.email}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<Link href={`/Storepart`}>
										<div className="font-semibold text-[13px] text-[#1da96d] cursor-pointer">
											 {store.Business_profile?.business_name} 
										</div>
									</Link>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="font-semibold text-[13px]">
										{store.storeId}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="font-semibold text-[13px]">
										{store?.dateJoined}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<button
										className={`btn-xs w-36 h-9 rounded-full flex items-center justify-center ${store?.statusClass}`}
									>
										{store?.status === "Active" && (
											<div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
										)}
										{store?.status === "Rejected" && (
											<div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
										)}
										{store?.status === "Disabled" && (
											<div className="w-3 h-3 bg-[#494a53] rounded-full mr-2"></div>
										)}
										{store?.status === "Awaiting Approval" && (
											<div className="w-3 h-3 bg-[#ff9800] rounded-full mr-2"></div>
										)}
										<span className="font-semibold">
											{store?.status}
										</span>
									</button>
								</td>
								<td className="px-4 py-2 text-center relative">
									<div className="flex items-center justify-center">
										<HiOutlineDotsVertical
											className="cursor-pointer"
											onClick={() => toggleDropdown(index)}
										/>
									</div>
									{showDropdown === index && (
										<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
											<ul>
												<li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
													View Details
												</li>
												<li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
													Edit Store
												</li>
												<li className="px-4 py-2 cursor-pointer hover:bg-gray-100">
													Delete Store
												</li>
											</ul>
										</div>
									)}
								</td>
							</tr>
						))}  
					</tbody>
					<tfoot>
						<tr>
							<td
								colSpan={7}
								className="py-4 text-center bg-[#f4f7fa]"
							>
								<div className="flex justify-center space-x-2">
									{Array.from({ length: totalPages }, (_, i) => (
										<button
											key={i}
											className={`w-8 h-8 ${
												currentPage === i + 1
													? "bg-green-600 text-white"
													: "bg-white text-gray-700 border"
											} rounded-full flex items-center justify-center`}
											onClick={() => handlePageChange(i + 1)}
										>
											{i + 1}
										</button>
									))}
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default AllStores;
