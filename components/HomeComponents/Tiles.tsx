import Card, { iCard } from "./Card";
import { IoMdCash } from "react-icons/io";
import React from "react";
import { FaStore } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import CardTwo, { iCardTwo } from "./CardTwo";

const Tiles = () => {
	const cardData: iCard[] = [
		{
			btnColour: "bg-[#ff3838]",
			icon: (
				<MdPeople
					size={20}
					color="red"
				/>
			),
			lgTxt: "20,248+",
			smTxt: "Total Users",
		},
		{
			btnColour: "bg-[#e19c2c]",
			icon: (
				<FaStore
					size={20}
					color="orange"
				/>
			),
			lgTxt: "20,248+",
			smTxt: "Total Vendors",
		},
		{
			btnColour: "bg-[#202020]",
			icon: (
				<IoMdCash
					size={20}
					color="black"
				/>
			),
			lgTxt: "₦128,248",
			smTxt: "Total Cashback Made",
		},
		{
			btnColour: "bg-[#1da96d]",
			icon: (
				<IoMdCash
					size={20}
					color="green"
				/>
			),
			lgTxt: "₦10,000",
			smTxt: "Total Cashback Paid",
		},
	];
	const cardDataTwo: iCardTwo[] = [
		{
			btnColour: true,
			icon: (
				<IoMdCash
					size={17}
					color="black"
				/>
			),
			lgTxt: "20,248",
			smTxt: "Total Cashback",
		},
		{
			btnColour: true,
			icon: (
				<IoMdCash
					size={17}
					color="green"
				/>
			),
			lgTxt: "20,248",
			iconBgColor: "green",
			smTxt: "Paid Cashback",
		},
		{
			icon: (
				<IoMdCash
					size={17}
					color="blue"
				/>
			),
			lgTxt: "₦128,248",
			smTxt: "Approved Cashback",
		},
		{
			icon: (
				<IoMdCash
					size={17}
					color="yellow"
				/>
			),
			lgTxt: "₦10,000",
			smTxt: "Pending Cashback",
		},
		{
			icon: (
				<IoMdCash
					size={17}
					color="red"
				/>
			),
			lgTxt: "₦10,000",
			smTxt: "Cancelled Cashback",
		},
	];

	return (
		<div>
			<p className="mb-3 font-bold text-[20px]">Welcome Ekene,</p>

			<div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5">
				{cardData.map((el: iCard, i: number) => (
					<Card
						btnColour={el.btnColour}
						icon={el.icon}
						key={i}
						lgTxt={el.lgTxt}
						smTxt={el.smTxt}
					/>
				))}
			</div>
			<p className="font-bold mt-8 text-[20px]">Balance Details</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
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

export default Tiles;
