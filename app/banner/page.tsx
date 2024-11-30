"use client";
import React from "react";
import BannerHeader from "../../components/static/BannerHeader";
import BannerTable from "../../components/BannerComponents/BannerTable";

const Page = () => {
	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<BannerHeader />
			</div>
			<BannerTable />
		</main>
	);
};

export default Page;
