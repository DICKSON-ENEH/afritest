"use client";

import React, { useState, CSSProperties, useEffect } from "react";

import Header from "../components/static/Header";

import Transaction from "../components/HomeComponents/Transaction";
import ClipLoader from "react-spinners/ClipLoader";

import Tiles from "../components/HomeComponents/Tiles";
import { useSelector } from "react-redux";
import { RootState } from "redux/Store/Store";

const Page = () => {


	useEffect(() => {

		document.title = "HOME";
	  }, []);
	const { isLoggedIn } = useSelector((state: RootState) => state.user);

	// const { isLoggedIn } = useSelector(
	// 	(state: RootState) => state.user
	// );

	const override: CSSProperties = {
		display: "block",
		margin: "0 auto",
		borderColor: "#1D995F",
	};
	let [loading] = useState(true);
	let [color] = useState("#1D995F");
	return isLoggedIn ? (
		<div className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<Header />
			</div>
			<Tiles />
			<Transaction />
		</div>
	) : (
		<div className="w-full min-h-screen flex justify-center items-center flex-col">
			<ClipLoader
				color={color}
				loading={loading}
				cssOverride={override}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>{" "}
			<div className="text-[#1D995F]  mt-[20px]">
				Please wait . . .
			</div>
		</div>
	);
};

export default Page;
