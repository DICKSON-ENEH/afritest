'use client';
import ContentSwitcher from "../../components/CmsComponents/ContentSwitcher";
import OtherHeader from "../../components/static/OtherHeader";
import React from "react";



const Page = () => {

	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 ">
				<OtherHeader />
			</div>

			<ContentSwitcher/>
		</main>
	)
}

export default Page
