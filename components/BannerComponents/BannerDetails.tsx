"use client";
import { useParams } from "next/navigation";
import React from "react";

const banners = [
	{
		id: "BN-00001",
		name: "Ekene Jacob",
		role: "Tech Lead",
		targetAudience: "NewUser",
		email: "rehobotheken@gmail.com",
		platform: "User Mobile App",
		startDate: "May 27th, 2024. 10:30am",
		endDate: "May 29th, 2024. 12:00pm",
		status: "Active",
	},
	{
		id: "123456789",
		name: "Moses Jacob",
		role: "Product Manager",
		targetAudience: "NewUser",
		email: "rehobotheken@gmail.com",
		platform: "User Mobile App",
		startDate: "May 27th, 2024. 10:30am",
		endDate: "May 29th, 2024. 12:00pm",
		status: "Inactive",
	},

];

const BannerDetails = () => {
	const { id } = useParams();


	const banner = banners.find((banner) => banner.id === id);

	return (
		<div className="border pb-5">
			<div className="w-full py-4 pl-3 bg-gray-100">
				<b>Details</b>
			</div>

			{banner ? (
				<div className="px-4">
					<div className="py-3 flex items-center justify-between border-b">
						<div>ID</div>
						<div>{banner.id}</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Platform</div>
						<div>{banner.platform}</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Target Audience</div>
						<div>
							<div>{banner.targetAudience},</div>
							<div>{banner.status}</div>
						</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Start Date</div>
						<div>{banner.startDate}</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>End Date</div>
						<div>{banner.endDate}</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Redirect Link</div>
						<div></div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Created By</div>
						<div>
							<div>
								{banner.name} | {banner.role} |
							</div>
							<div>{banner.email}</div>
							<div>{banner.endDate}</div>
						</div>
					</div>
					<div className="py-3 flex items-center justify-between border-b">
						<div>Updated By</div>
						<div>
							<div>
								{banner.name} | {banner.role} |
							</div>
							<div>{banner.email}</div>
							<div>{banner.endDate}</div>
						</div>
					</div>
				</div>
			) : (
				<div className="px-4">
					<div className="py-3">Banner not found</div>
				</div>
			)}
		</div>
	);
};

export default BannerDetails;
