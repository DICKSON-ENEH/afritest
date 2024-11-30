import React, { useState } from "react";
// import pic from "../../assets/login.png";
import pic from "../../../public/assets/login.png";

import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineEdit } from "react-icons/ai";
import EditPopup from "./EditPopup";

const ProfileDetails = () => {
	const [showPopup, setShowPopup] = useState(false);

	const handleEditClick = () => {
		setShowPopup(true);
	};

	const hnadleClosePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className="p-6 border rounded-lg bg-white ">
			<div className="mb-6">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-semibold mb-4">About you</h2>

					<div
						className="w-[40px] h-[40px] border rounded-full flex justify-center items-center hover:bg-slate-200 cursor-pointer"
						onClick={handleEditClick}
					>
						<AiOutlineEdit size={25} />
					</div>
				</div>
				<div className="grid grid-cols-3 gap-4">
					<div>
						<label className="block text-sm text-gray-500">
							Full name
						</label>
						<p className="text-[15px] font-semibold">Moses Jacob</p>
					</div>
					<div>
						<label className="block text-sm text-gray-500">
							Email address
						</label>
						<p className="text-[15px] font-semibold">
							mosesjacob@gmail.com
						</p>
					</div>
					<div>
						<label className="block text-sm text-gray-500">
							Mobile number
						</label>
						<p className="text-[15px] font-semibold">
							+234 803 4628 378
						</p>
					</div>
				</div>
			</div>
			<hr className="mb-6" />
			<div>
				<h2 className="text-2xl font-semibold mb-4">Avatar</h2>
				<div className="flex items-center justify-between">
					<div>
						<p className="text-gray-500">
							Select a beautiful picture for yourself!
						</p>
					</div>
					<div className="flex-grow flex items-center ml-20">
						<Image
							src={pic}
							alt="Avatar"
							className="w-20 h-20 rounded-full mr-4"
						/>
						<div className="mt-2 border-dashed border-2 border-gray-300 p-4 rounded-lg  font-semibold cursor-pointer flex justify-start items-center flex-col">
							<div className="rounded-full w-[40px] h-[40px] border flex items-center justify-center">
								<CiImageOn size={20} />
							</div>
							<button>Click to replace or drag and drop</button>
							<p className="text-sm text-gray-500 mt-1">
								SVG, PNG, JPG or GIF (max 800 x 400px)
							</p>
						</div>
					</div>
				</div>
			</div>

			{showPopup && <EditPopup onClose={hnadleClosePopup} />}
		</div>
	);
};

export default ProfileDetails;
