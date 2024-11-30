import React, { FC } from "react";

interface RoleEditFormProps {
	role: any;
}

const RoleEditForm: FC<RoleEditFormProps> = ({ role }) => {
	return (
		<div className="max-w-[99%] mx-auto ">
			<div className="mb-4">
				<label className="block text-sm font-semibold mb-2">
					User Role Name
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 border rounded"
					defaultValue={role.name}
				/>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-semibold mb-2">
					Description
				</label>
				<textarea
					className="w-full px-3 py-2 border rounded"
					defaultValue={role.description || ""}
				></textarea>
			</div>
			<div className="mb-4">
				<h3 className="text-sm font-semibold mb-2">Permissions</h3>
				<div className="mb-2">
					<label className="block text-sm font-semibold mb-2">
						User Permissions
					</label>
					<div className="flex items-center mb-2">
						<input
							type="checkbox"
							className="mr-2"
							checked={true}
						/>
						<label>Create User</label>
					</div>
					<div className="flex items-center mb-2">
						<input
							type="checkbox"
							className="mr-2"
							checked={true}
						/>
						<label>Blacklist User</label>
					</div>
					<div className="flex items-center mb-2">
						<input
							type="checkbox"
							className="mr-2"
							checked={true}
						/>
						<label>Delete User</label>
					</div>
				</div>
				<div className="mb-2">
					<label className="block text-sm font-semibold mb-2">
						Subscription Permissions
					</label>
					<div className="flex items-center mb-2">
						<input
							type="checkbox"
							className="mr-2"
							checked={true}
						/>
						<label>Subscription Permissions</label>
					</div>
				</div>
			</div>
			<div className="flex justify-end">
				<button
					className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
					onClick={() => {}}
				>
					Cancel
				</button>
				<button
					className="bg-green-500 text-white px-4 py-2 rounded"
					onClick={() => {}}
				>
					Save Changes
				</button>
			</div>
		</div>
	);
};

export default RoleEditForm;
