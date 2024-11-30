import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

interface EditPopupProps {
	onClose: () => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ onClose }) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white w-[100%] max-w-lg h-[95%] max-h-md rounded-md shadow-lg flex   p-5 flex-col">
				<div className="w-full">
					<div className="flex justify-end cursor-pointer">
						<IoCloseCircleOutline
							size={30}
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 text-2xl"
						/>
					</div>
				</div>
				<div className="items-center">
					<div>
						<h2 className="text-[30px] font-bold">About you</h2>
						<p>You can edit the information in the editable fields</p>
					</div>
					<div className="mt-5">
						<div>
							<p className="font-bold">Full Name</p>
							<input
								type="name"
								placeholder="Moses Jacob"
								className="w-full border outline-none h-12 p-2 font-semibold mt-2"
							/>
						</div>
						<div className="mt-5">
							<p className="font-bold">Mobile Number</p>
							<input
								type="number"
								placeholder="+234 803 4628 378"
								className="w-full border outline-none h-12 p-2 font-semibold mt-2"
							/>
						</div>
						<div className="mt-5">
							<p className="font-bold">Email Address</p>
							<input
								type="email"
								placeholder="example@gmail.com"
								className="w-full border outline-none h-12 p-2 font-semibold bg-[#f7f7f9] mt-2"
							/>
						</div>
					</div>

					<div className="w-full justify-between items-center flex mt-10">
						<button className="border-black border px-16 py-3 text-black rounded-lg font-bold text-[14px]">
							Cancel
						</button>
						<button className="border px-16 py-3 text-white bg-[#1da96d] rounded-lg text-[14px] font-bold">
							Save Changes
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditPopup;
