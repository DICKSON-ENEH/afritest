"use client";

import AuditContentSwitcher from "components/AuditComponents/AuditContentSwitcher";
import OtherHeader from "components/static/OtherHeader";
import React, { useEffect } from "react";
// import OtherHeader from "@/components/static/OtherHeader";
// import AuditContentSwitcher from "@/components/AuditComponents/AuditContentSwitcher";

const Page = () => {
	useEffect(() => {
		document.title = "Audit";
	}, []);

	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<OtherHeader />
			</div>
			<AuditContentSwitcher />
		
		</main>
	);
};

export default Page;
