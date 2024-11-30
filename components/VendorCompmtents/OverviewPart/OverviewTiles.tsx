import { IoMdCash } from "react-icons/io";
import React from "react";
import CardTwo, { iCardTwo } from "../VendorCard";
import { MdAnalytics, MdPeopleAlt } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const OverviewTiles = () => {
	const cardDataTwo: iCardTwo[] = [
		{
			btnColour: true,
			icon: (
				<IoMdCash
					size={17}
					color="#1da96d"
				/>
			),
			lgTxt: "N2,248,500",
			smTxt: "Revenue",
		},
		{
			btnColour: true,
			icon: (
				<MdAnalytics
					size={17}
					color="#1da96d"
				/>
			),
			lgTxt: "260",
			iconBgColor: "green",
			smTxt: "Stores",
		},
		{
			icon: (
				<LuLayoutDashboard
					size={17}
					color="#1da96d"
				/>
			),
			lgTxt: "850+",
			smTxt: "Products",
		},
		{
			icon: (
				<MdPeopleAlt
					size={17}
					color="#1da96d"
				/>
			),
			lgTxt: "220",
			smTxt: "Vendors",
		},
	];

	return (
		<div>
			<p className="font-bold mt-6 text-[20px]">Overview</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-7">
				{cardDataTwo.map((el: iCardTwo, i: number) => (
					<CardTwo
						btnColour={el.btnColour}
						icon={el.icon}
						key={i}
						lgTxt={el.lgTxt}
						smTxt={el.smTxt}
					/>
				))}
			</div>
		</div>
	);
};

export default OverviewTiles;
