"use client";
import Link from "next/link";
import React, { useState } from "react";

const data = [
	{
		id: 1,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},
	{
		id: 2,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Booking Officer",
		loginDate: "10th August, 2023",
		loginTime: "03:17:20",
		logoutDate: "10th August, 2023",
		logoutTime: "03:17:20",
	},

];
const AdminPanel = () => {
	const [currentPage, setCurrentPage] = useState<number>(0);
	const itemsPerPage = 7;

	const firstIndex = currentPage * itemsPerPage;
	const lastIndex = Math.min(firstIndex + itemsPerPage, data.length);

	const mainData = data.slice(firstIndex, lastIndex);

	const numberOfPages = Math.ceil(data.length / itemsPerPage);

	const numArray = Array.from(
		{ length: numberOfPages },
		(_, index) => index
	);

	const onHandlePageChange = (index: number) => {
		setCurrentPage(index);
	};

	return (
		<div className="mt-7">
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="w-full border-b text-[#494a53]">
							<th className="px-4 py-4 text-center">Names</th>
							<th className="px-4 py-4 text-center">Email Address</th>
							<th className="px-4 py-4 text-center">Role</th>
							<th className="px-4 py-4 text-center">Login Time</th>
							<th className="px-4 py-4 text-center">Logout Time</th>
						</tr>
					</thead>
					<tbody>
						{mainData.map((item, index) => (
							<tr
								key={index}
								className="border-b text-[#494a53]"
							>
								<td className="px-4 py-4 text-center">
									<Link href={`/audit/${item.id}`}>
										<div className="text-[15px] text-green-500 font-semibold">
											{item.name}
										</div>
									</Link>
								</td>
								<td className="px-4 py-4 text-center">
									<Link href={`/audit/${item.id}`}>
										<div className="flex items-center gap-2 justify-center">
											<div className="text-[15px]">{item.email}</div>
										</div>
									</Link>
								</td>
								<td className="px-4 py-4 text-center">
									<Link href={`/audit/${item.id}`}>
										<div className="flex items-center gap-2 justify-center">
											<div className="text-[15px]">{item.role}</div>
										</div>
									</Link>
								</td>
								<td className="px-4 py-4 items-center">
									<Link href={`/audit/${item.id}`}>
										<div className="flex items-center gap-2 justify-center">
											<div className="text-sm text-gray-500">
												<div className="font-semibold">
													{item.loginDate}
												</div>
												{item.loginTime}
											</div>
										</div>
									</Link>
								</td>
								<td className="px-4 py-4 items-center">
									<Link href={`/audit/${item.id}`}>
										<div className="flex items-center gap-2 justify-center">
											<div className="text-sm text-gray-500">
												<div className="font-semibold">
													{item.logoutDate}
												</div>
												{item.logoutTime}
											</div>
										</div>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="w-full flex justify-between mt-4">
					<p>
						{firstIndex + 1} - {lastIndex} of {data.length}
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
			</div>
		</div>
	);
};

export default AdminPanel;
