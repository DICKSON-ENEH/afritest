"use client";
// import SettingsComponentsSwitcher from "components/SettingsComponents/SettingsComponentsSwitcher";

 import SettingsComponentsSwitcher from "../../components/SettingsComponents/SettingsComponentsSwitcher";
import OtherHeader from "../../components/static/OtherHeader";
import React, {useEffect} from "react";

// import OtherHeader from "@/components/static/OtherHeader";
// import SettingsComponentsSwitcher from "@/components/SettingsComponents/SettingsComponentsSwitcher";

const Page = () => {
	useEffect(() => {

		document.title = "SETTINGS";
	  }, []);

	return (
		<main className="w-full min-h-screen">
			<div className="mb-10 mt-">
				<OtherHeader />
			</div>

			<SettingsComponentsSwitcher />
		</main>
	);
};

export default Page;
