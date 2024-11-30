"use client";
import ProductContentSwitcher from "../../components/ProductComponents/ProductContentSwitcher";
import OtherHeader from "../../components/static/OtherHeader";
import React, {useEffect} from "react";


const page = () => {

	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<OtherHeader />
			</div>

			<ProductContentSwitcher />
		</main>
	);
};

export default page;
