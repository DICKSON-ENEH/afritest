import React from "react";
import Permissions from "../Permissions";

const PremissionData = () => {
	const userPermissions = [
		{
			category: "User Premission",
			items: [
				"View user list",
				"View user contact information",
				"Perform relevant actions for each other",
			],
		},
		{
			category: "Subscription Premission",
			items: [
				"Manage subscription plans",
				"View subscription details",
				"Update subscription status",
			],
		},
	];

	return (
		<div>
			<Permissions
				role="Support"
				permissionsTitle="Permissions"
				permissions={userPermissions}
			/>
		</div>
	);
};

export default PremissionData;
