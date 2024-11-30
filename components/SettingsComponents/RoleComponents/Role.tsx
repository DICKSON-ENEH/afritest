import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineAdd } from "react-icons/md";
import RoleSwitch from "./RoleSwitch";
import RoleSide from "./RoleSide";
import Dropdown from "../Dropdown";

const roles = [
	{
		name: "Super Admin",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {
			"View Role": {
				"View roles and permissions tab": true,
				"View list of created roles": true,
				"Search through created roles": true,
			},
			"Create Role": {
				"View roles and permission tab": true,
				"View and create new role": true,
				"View and fill the create role fields": true,
				"Save created role": false,
				"View list of created roles": false,
			},
		},
	},
	{
		name: "Content Moderators",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "User Support / Admin",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "Analytics and Reporting Admin",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "Payment and Subscription Admin",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "Technical Support",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
];

const customRoles = [
	{
		name: "Customer Support",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "Customer Support",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
	{
		name: "Customer Support",
		active: 25,
		inactive: 12,
		date: "16th Aug 2023, 2:49 PM",
		permissions: {},
	},
];

const Role: React.FC = () => {
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [selectedRole, setSelectedRole] = useState<null | any>(null);
	const [showDropdown, setShowDropdown] = useState<{
		[key: string]: boolean;
	}>({});

	const closeDetails = () => {
		setShowDetails(false);
		const timeout = setTimeout(() => {
			setSelectedRole(null);
			clearTimeout(timeout);
		}, 1000);
	};

	const showDetail = (role: any) => {
		setShowDetails(true);
		setSelectedRole(role);
	};

	const toggleDropdown = (key: string) => {
		setShowDropdown((prevState) => ({
			...prevState,
			[key]: !prevState[key],
		}));
	};

	const handleViewPermissions = (role: any) => {
		setShowDetails(true);
		setSelectedRole(role);
	};

	return (
		<div className="p-4">
			<div className="w-full flex justify-between items-center">
				<h2 className="text-2xl font-semibold mb-4">Default Roles</h2>

				<button className="bg-[#1da96d] px-8 py-3 mb-4 rounded-l-full rounded-r-full text-white flex items-center gap-1">
					<MdOutlineAdd size={20} />
					<p>Create New Role</p>
				</button>
			</div>

			<div className="overflow-hidden">
				<RoleSide
					showDetails={showDetails}
					selectedRole={selectedRole}
					closeDetails={closeDetails}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{roles.map((role, index) => (
					<div
						key={`default-${index}`}
						className="relative border rounded-lg p-4"
					>
						<h3 className="text-[17px] font-bold mb-4">
							{role.name}
						</h3>
						<p className="text-gray-500 text-sm">
							Last modified on {role.date}
						</p>
						<div className="mt-2">
							<p className="flex items-center justify-between">
								Active users:{" "}
								<span className="font-bold">{role.active}</span>
							</p>
							<p className="flex items-center justify-between">
								Inactive users:{" "}
								<span className="font-bold">{role.inactive}</span>
							</p>
						</div>
						<hr className="mt-5" />
						<div className="w-full justify-end items-center flex mt-3 relative">
							<div
								className="w-[30px] h-[30px] rounded-full bg-[#f4f7fa] flex justify-center items-center cursor-pointer"
								onClick={() => toggleDropdown(`default-${index}`)}
							>
								<HiOutlineDotsVertical />
							</div>
							{showDropdown[`default-${index}`] && (
								<div className="absolute right-0">
									<Dropdown
										onViewPermissions={() =>
											handleViewPermissions(role)
										}
										role={role}
									/>
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<h2 className="text-2xl font-semibold mt-8 mb-4">
				Custom Roles
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{customRoles.map((role, index) => (
					<div
						key={`custom-${index}`}
						className="relative border rounded-lg p-4"
					>
						<div className="w-full flex justify-between items-center mb-4">
							<h3 className="text-[17px] font-bold">{role.name}</h3>
							<div
								className="w-[30px] h-[30px] rounded-full bg-[#f4f7fa] flex justify-center items-center cursor-pointer"
								onClick={() => toggleDropdown(`custom-${index}`)}
							>
								<HiOutlineDotsVertical />
							</div>
						</div>
						<p className="text-gray-500 text-sm">
							Last modified on {role.date}
						</p>
						<div className="mt-2">
							<p className="flex items-center justify-between">
								Active users:{" "}
								<span className="font-bold">{role.active}</span>
							</p>
							<p className="flex items-center justify-between">
								Inactive users:{" "}
								<span className="font-bold">{role.inactive}</span>
							</p>
						</div>
						<hr className="mt-5" />
						<div className="w-full justify-end items-center flex mt-3 relative">
							<div
								className="w-[30px] h-[30px] rounded-full bg-[#f4f7fa] flex justify-center items-center cursor-pointer"
								onClick={() => toggleDropdown(`custom-${index}`)}
							>
								<HiOutlineDotsVertical />
							</div>
							{showDropdown[`custom-${index}`] && (
								<div className="absolute right-0 z-50">
									<Dropdown
										onViewPermissions={() =>
											handleViewPermissions(role)
										}
										role={role}
									/>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Role;
