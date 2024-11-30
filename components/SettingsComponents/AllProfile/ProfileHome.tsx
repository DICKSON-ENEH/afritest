import { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import PremissionData from "../PremissionData/PremissionData";

const ProfileHome = () => {
	const [activeTab, setActiveTab] = useState<
		"profile" | "permissions"
	>("profile");

	return (
		<div className="mt-7">
			<div className="w-full max-w-4xl">
				<div className="flex space-x-4 mb-6">
					<button
						onClick={() => setActiveTab("profile")}
						className={`pb-2 ${
							activeTab === "profile"
								? "border-b-2 border-green-500 text-green-500"
								: ""
						}`}
					>
						Profile Details
					</button>
					<button
						onClick={() => setActiveTab("permissions")}
						className={`pb-2 ${
							activeTab === "permissions"
								? "border-b-2 border-green-500 text-green-500"
								: ""
						}`}
					>
						Permissions
					</button>
				</div>
				<div>
					{activeTab === "profile" && <ProfileDetails />}
					{activeTab === "permissions" && <PremissionData />}
				</div>
			</div>
		</div>
	);
};

export default ProfileHome;
