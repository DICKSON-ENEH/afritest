import React, { FC, useState } from "react";
import Modal from "./RoleComponents/Modal";
import RoleEditForm from "./RoleComponents/RoleEditForm";
import SeeMembers from "./RoleComponents/SeeMembers";

interface DropdownProps {
	onViewPermissions: () => void;
	role: any;
}

const Dropdown: FC<DropdownProps> = ({ onViewPermissions, role }) => {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showMembers, setShowMembers] = useState<boolean>(false);

	const handleEditRoleClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const handleSeeMembersClick = () => {
		setShowMembers(true);
	};

	const handleCloseMembers = () => {
		setShowMembers(false);
	};

	return (
		<div className="absolute bg-white border rounded shadow-lg mt-3 py-2 w-44 text-left right-0 z-10">
			<div
				className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold"
				onClick={onViewPermissions}
			>
				View Permissions
			</div>
			<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
			<div
				className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold"
				onClick={handleSeeMembersClick}
			>
				See Members
			</div>
			<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
			<div
				className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold"
				onClick={handleEditRoleClick}
			>
				Edit Role
			</div>
			<Modal
				show={showModal}
				onClose={handleCloseModal}
				title={`Edit Role: ${role.name}`}
			>
				<RoleEditForm role={role} />
			</Modal>
			<SeeMembers
				show={showMembers}
				onClose={handleCloseMembers}
			/>
		</div>
	);
};

export default Dropdown;
