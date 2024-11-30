import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface SeeMembersProps {
	show: boolean;
	onClose: () => void;
}

const SeeMembers: React.FC<SeeMembersProps> = ({ show, onClose }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedMembers, setSelectedMembers] = useState<string[]>(
		[]
	);
	const [showActive, setShowActive] = useState(true);
	const [showMoveModal, setShowMoveModal] = useState(false);
	const [selectedRole, setSelectedRole] = useState<string | null>(
		null
	);

	const members = [
		{
			name: "Moses Jacob",
			email: "moses.jacob@gmail.com",
			active: true,
		},
		{ name: "John Doe", email: "john.doe@gmail.com", active: true },
		{
			name: "Dickson Chaii",
			email: "dickson.chaii@gmail.com",
			active: false,
		},
		{ name: "Ekene Ok", email: "ekene.ok@gmail.com", active: true },
		{
			name: "Topper Fly",
			email: "topper.fly@gmail.com",
			active: false,
		},
		{ name: "John Good", email: "john.good@gmail.com", active: true },
	];

	const roles = [
		{ name: "Customer Support", activeUsers: 25, inactiveUsers: 12 },
		{ name: "Admin", activeUsers: 10, inactiveUsers: 5 },
		{ name: "Manager", activeUsers: 15, inactiveUsers: 3 },
		{ name: "Developer", activeUsers: 8, inactiveUsers: 2 },
	];

	const filteredMembers = members.filter(
		(member) =>
			(member.name
				.toLowerCase()
				.includes(searchQuery.toLowerCase()) ||
				member.email
					.toLowerCase()
					.includes(searchQuery.toLowerCase())) &&
			member.active === showActive
	);

	const toggleSelectMember = (email: string) => {
		setSelectedMembers((prevSelected) =>
			prevSelected.includes(email)
				? prevSelected.filter((e) => e !== email)
				: [...prevSelected, email]
		);
	};

	const handleRoleSelect = (role: string) => {
		setSelectedRole(role);
	};

	const handleMoveUsers = () => {
		if (selectedRole) {
			console.log(
				`Moving users: ${selectedMembers} to role: ${selectedRole}`
			);
			setSelectedMembers([]);
			setSelectedRole(null);
			setShowMoveModal(false);
		}
	};

	if (!show) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-md p-6 relative scale-[75%]">
				<div className="w-[95%] h-[90%]">
					<button
						className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
						onClick={onClose}
					>
						<IoMdClose size={30} />
					</button>
					<h2 className="text-lg font-bold mb-4">See Members</h2>
					<p className="bg-gray-100 p-3 rounded text-sm text-center mb-4">
						The following users will be deactivated if you disable
						this role. You can move disabled users to another role
						before disabling the role.
					</p>
					<input
						type="text"
						className="w-full mb-4 p-2 border rounded"
						placeholder="Search members..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<div className="flex justify-between text-center mb-4">
						<button
							className={`flex-1 py-2 font-bold ${
								showActive
									? "text-green-500 border-b-2 border-green-500"
									: "text-gray-500"
							}`}
							onClick={() => setShowActive(true)}
						>
							Active Users (
							{members.filter((member) => member.active).length})
						</button>
						<button
							className={`flex-1 py-2 font-bold ${
								!showActive
									? "text-green-500 border-b-2 border-green-500"
									: "text-gray-500"
							}`}
							onClick={() => setShowActive(false)}
						>
							Inactive Users (
							{members.filter((member) => !member.active).length})
						</button>
					</div>
					<div className="border-t border-gray-200 my-2"></div>
					<div className="space-y-2">
						{filteredMembers.map((member, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
								onClick={() => toggleSelectMember(member.email)}
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										checked={selectedMembers.includes(member.email)}
										onChange={() => toggleSelectMember(member.email)}
										className="mr-2"
									/>
									<div>
										<p className="font-bold">{member.name}</p>
										<p className="text-gray-500 text-sm">
											{member.email}
										</p>
									</div>
								</div>
								<button className="text-gray-500 hover:text-gray-800">
									<IoMdClose size={25} />
								</button>
							</div>
						))}
						{filteredMembers.length === 0 && (
							<p className="text-center text-gray-500">
								No members found.
							</p>
						)}
					</div>
					<div className="flex justify-between items-center mt-6">
						<button
							className="px-4 py-2 border rounded-lg"
							onClick={onClose}
						>
							Cancel
						</button>
						<button className="px-4 py-2 bg-green-500 text-white rounded-lg">
							Disable Role
						</button>
					</div>
					{selectedMembers.length > 0 && (
						<div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center">
							<span className="text-green-400">
								Selected Users ({selectedMembers.length})
							</span>
							<div>
								<button
									className="px-4 py-2 bg-green-500 text-white rounded-full mr-2"
									onClick={() => setShowMoveModal(true)}
								>
									Move selected users
								</button>
								<button
									className="px-4 py-2 bg-red-500 text-white rounded-lg"
									onClick={() => setSelectedMembers([])}
								>
									<IoMdClose />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{showMoveModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white rounded-lg w-full max-w-5xl p-6 relative">
						<button
							className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
							onClick={() => setShowMoveModal(false)}
						>
							<IoMdClose size={30} />
						</button>
						<h2 className="text-lg font-bold mb-4">Select Role</h2>
						<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
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
									<div className="absolute top-2 right-2">
										<div
											className={`w-4 h-4 rounded-full ${
												selectedRole === role.name
													? "bg-green-500"
													: "bg-gray-300"
											}`}
										></div>
									</div>
									<h3 className="font-bold mb-2">{role.name}</h3>
									<p className="text-sm mb-2">
										This role is best suited for the business owner
										that will require full admin access.
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
								onClick={() => setShowMoveModal(false)}
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
			)}
		</div>
	);
};

export default SeeMembers;
