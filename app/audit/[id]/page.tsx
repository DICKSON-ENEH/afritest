"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import OtherHeder from "../../../components/static/OtherHeader";

const data = [
	{
		id: 1,
		name: "Moses Jacob",
		email: "moses.jacob@faramove.com",
		role: "Tech Support Lead",
		loginDate: "24-04-2023",
		loginTime: "03:12PM",
		logoutDate: "24-04-2023",
		logoutTime: "03:12PM",
		status: "Active",
		actions: [
			{
				time: "09:20am",
				description: "User created",
				user: "Admin user",
				email: "Merchant@merchantmail.com",
			},
			{
				location: "Lagos Nigeria",
				time: "10:34am",
				description: "Login",
				description1: "User deleted",
				user: "2018 Macbook Pro 15-inch",
				status: "ACTIVE NOW",
				email: "",
			},
		],
	},

];

const UserInfo = () => {
	const { id } = useParams();
	const router = useRouter(); 
	const userId = Array.isArray(id) ? id[0] : id; 
	const user = data.find((user) => user.id === parseInt(userId, 10));

	if (!user) return <div>User not found</div>;

	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("");

	return (
		<>
			<OtherHeder />
			<div className="bg-white rounded-lg p-6 max-w-full mx-auto">
				<div className="flex flex-col md:flex-row items-center mb-6">
					<button
						onClick={() => router.back()}
						className="flex items-center mb-4 md:mb-0 md:mr-4"
					>
						<IoArrowBack className="h-6 w-6 text-gray-700 mr-3" />
					</button>
					<div className="flex-shrink-0 h-12 w-12 rounded-full bg-black flex items-center justify-center text-xl text-white font-semibold mb-4 md:mb-0">
						{initials}
					</div>
					<div className="flex flex-col md:flex-row items-center w-full md:w-auto">
						<div className="ml-0 md:ml-4 text-center md:text-left">
							<div className="text-xl font-semibold">{user.name}</div>
							<div className="text-sm text-gray-500">
								{user.email}
							</div>
						</div>
						<div className="text-green-500 font-semibold mt-4 md:mt-0 md:ml-5">
							{user.status}
						</div>
					</div>
				</div>

				<hr className="my-4" />
				<div className="mb-6 border rounded-lg p-4 max-w-full mx-auto">
					<div className="mb-2">User Information</div>
					<hr className="my-4" />
					<div className="text-gray-600 flex flex-col md:flex-row justify-between items-start md:items-center text-[14px]">
						<div className="flex-1">
							<div className="flex gap-4 md:gap-16">
								<span className="">Role:</span>
								<span className="font-semibold">{user.role}</span>
							</div>
							<div className="mt-4 flex gap-4 md:gap-8">
								<span className="">Login Time:</span>
								<span className="font-semibold">
									{user.loginDate} . {user.loginTime}
								</span>
							</div>
						</div>
						<div className="flex-1 mt-4 md:mt-0 md:ml-4">
							<div className="flex gap-4 md:gap-16 justify-end">
								<span className="">Logout Time:</span>
								<span className="font-semibold">
									{user.logoutDate} . {user.logoutTime}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="border rounded-lg">
					<div className="mb-6 border rounded-lg p-4 max-w-full mx-auto">
						<div className="mb-4">
							<div className="mb-2">Actions Performed</div>
							<hr className="my-4" />
							<div className="flex space-x-4">
								<input
									type="date"
									className="w-full px-4 py-2 border rounded-lg"
								/>
								<input
									type="date"
									className="w-full px-4 py-2 border rounded-lg"
								/>
							</div>
						</div>
					</div>
					<div className="mt-14">
						<div className="flex flex-wrap ml-4 items-start">
							<div className="text-gray-500 text-sm font-semibold w-full md:w-auto ml-7">
								Today
							</div>
							<div className="border-l-2 border-black pl-4 ml-4 flex-1">
								{user.actions.map((action, index) => (
									<div
										className="mt-2"
										key={index}
									>
										<div className="text-gray-700 flex flex-wrap">
											<span className="font-semibold mr-11 w-full md:w-auto">
												{action.time}
											</span>
											<div className="flex-1">
												{action.description}
												<div className="text-gray-500 text-sm flex items-center">
													<span className="mr-2">
														{action.user} •{" "}
														{action.location || action.email}
													</span>
												</div>
											</div>
										</div>
										{index < user.actions.length - 1 && (
											<hr className="my-4" />
										)}
									</div>
								))}
							</div>
						</div>

						<hr className="my-4" />

						<div className="flex flex-wrap ml-4 items-start">
							<div className="text-gray-500 text-sm font-semibold w-full md:w-auto">
								Yesterday
							</div>
							<div className="border-l-2 border-black pl-4 ml-4 flex-1">
								{user.actions.map((action, index) => (
									<div
										className="mt-2"
										key={index}
									>
										<div className="text-gray-700 flex flex-wrap">
											<span className="font-semibold mr-11 w-full md:w-auto">
												{action.time}
											</span>
											<div className="flex-1">
												{action.description}
												<div className="text-gray-500 text-sm flex items-center">
													<span className="mr-2">
														{action.user} •{" "}
														{action.location || action.email}
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInfo;
