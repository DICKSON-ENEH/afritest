import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { IoBanSharp, IoCloseCircleOutline } from "react-icons/io5";

interface CreateBannerPopupProps {
	onClose: () => void;
}

const CreateBannerPopup: React.FC<CreateBannerPopupProps> = ({
	onClose,
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white w-[100%] max-w-lg h-[50%] max-h-md rounded-md shadow-lg flex justify-center items-center p-5">
				<div className="w-full">
					<div className="flex justify-end">
						<IoCloseCircleOutline
							size={30}
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700 text-2xl"
						/>
					</div>
					<div className="text-center justify-center flex  items-center flex-col">
						<div className="w-36 h-36 bg-green-500 rounded-full flex justify-center items-center mb-7">
							<IoMdCheckmark
								size={80}
								color="white"
							/>
						</div>
						<h2 className="text-gray-700 mb-4 font-bold text-[20px]">
							Banner Created
						</h2>
						<p className="text-gray-700 mb-6">
							You have creaed the Banner succeddfully
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateBannerPopup;
