"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import DeactivatePopup from "./DeactivatePopup";

const BreadCrumbs = () => {
	const { id } = useParams();
	const router = useRouter();
	const [showPopup, setShowPopup] = useState(false);

	const banners = [
		{
			id: "BN-00001",
			dateCreated: "17th July, 2023",
			platform: "User Mobile App",
			startDate: "24th July, 2023",
			endDate: "24th July, 2023",
			status: "Active",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
		{
			id: "123456789",
			dateCreated: "17th July, 2023",
			platform: "User Web App",
			startDate: "19th July, 2023",
			endDate: "24th July, 2023",
			status: "Inactive",
		},
	];

	const banner = banners.find((el) => el.id === id);

	const handleDeactivateClick = () => {
		setShowPopup(true);
	};

	const handleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<>
			<div className="w-full text-gray-500 flex items-center mt-5 mb-3 gap-2">
				<div
					className="text-green-500 text-[17px] cursor-pointer"
					onClick={() => router.back()}
				>
					Banner
				</div>
				<FaAngleRight size={23} />
				<div className=" text-[20px]">{banner?.platform}</div>
			</div>

			<div className="w-full py-5 px-5 flex items-center justify-between border-t-2 bg-gray-100 text-green-500">
				<div>
					<b className="text-[15px] lg:text-[18px]">
						{banner?.platform}
					</b>{" "}
					- {id} <b className="ml-3">{banner?.status}</b>
				</div>

				<div className="flex items-center gap-3 text-[10px] lg:text-[15px]">
					<button
						className="px-5 text-red-500 border py-2 border-red-500 uppercase"
						onClick={handleDeactivateClick}
					>
						Deactivate
					</button>
					<button className="px-5 text-green-500 border py-2 border-green-500 uppercase">
						Edit banner
					</button>
				</div>
			</div>

			{showPopup && <DeactivatePopup onClose={handleClosePopup} />}
		</>
	);
};

export default BreadCrumbs;
