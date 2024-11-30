import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

const MoveUsers: React.FC = () => {
	const [selectedMembers, setSelectedMembers] = useState<string[]>(
		[]
	);
	const [selectedRole, setSelectedRole] = useState<string | null>(
		null
	);
	const router = useRouter();

	useEffect(() => {
		if (router.query.selectedMembers) {
			setSelectedMembers(
				JSON.parse(router.query.selectedMembers as string)
			);
		}
	}, [router.query.selectedMembers]);

	const roles = [
		{ name: "Customer Support", activeUsers: 25, inactiveUsers: 12 },
		{ name: "Admin", activeUsers: 10, inactiveUsers: 5 },
		{ name: "Manager", activeUsers: 15, inactiveUsers: 3 },
		{ name: "Developer", activeUsers: 8, inactiveUsers: 2 },
	];

	const handleRoleSelect = (role: string) => {
		setSelectedRole(role);
	};

	const handleMoveUsers = () => {
		if (selectedRole) {
			console.log(
				`Moving users: ${selectedMembers} to role: ${selectedRole}`
			);
			// You can add your logic here for moving the users
			setSelectedMembers([]);
			setSelectedRole(null);
			router.push("/"); // Navigate back to the main page or desired page
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-4xl p-6 relative">
				<button
					className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
					onClick={() => router.push("/")}
				>
					<IoMdClose size={30} />
				</button>
				<h2 className="text-lg font-bold mb-4">Select Role</h2>
				<div className="grid grid-cols-3 gap-4">
					{roles.map((role, index) => (
						<div
							key={index}
							className={`border p-4 rounded-lg cursor-pointer relative ${
								selectedRole === role.name
									? "bg-green-100 border-green-500"
									: ""
							}`}
							onClick={() => handleRoleSelect(role.name)}
						>
							<div
								className="absolute top-2 right-2 h-4 w-4 rounded-full border border-gray-400 flex items-center justify-center cursor-pointer"
								onClick={() => handleRoleSelect(role.name)}
							>
								{selectedRole === role.name && (
									<div className="h-2 w-2 bg-green-500 rounded-full"></div>
								)}
							</div>
							<h3 className="font-bold mb-2">{role.name}</h3>
							<p className="text-sm mb-2">
								This role is best suited for the business owner that
								will require full admin access.
							</p>
							<p className="text-sm">
								Active users: {role.activeUsers}
							</p>
							<p className="text-sm">
								Inactive users: {role.inactiveUsers}
							</p>
						</div>
					))}
				</div>
				<div className="flex justify-between items-center mt-6">
					<button
						className="px-4 py-2 border rounded-lg"
						onClick={() => router.push("/")}
					>
						Cancel
					</button>
					<button
						className={`px-4 py-2 ${
							selectedRole
								? "bg-green-500 text-white"
								: "bg-gray-300 text-gray-500 cursor-not-allowed"
						} rounded-lg`}
						onClick={handleMoveUsers}
						disabled={!selectedRole}
					>
						Move Users
					</button>
				</div>
			</div>
		</div>
	);
};

export default MoveUsers;
