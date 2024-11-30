import React from "react";
import { IoBanSharp, IoCloseCircleOutline } from "react-icons/io5";

interface DeactivatePopupProps {
	onClose: () => void;
}

const DeactivatePopup: React.FC<DeactivatePopupProps> = ({
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
					<div className="text-center">
						<div className="text-red-500 mb-4 w-12 h-12 rounded-full bg-[#fee4e2] flex justify-center items-center">
							<IoBanSharp size={30} />
						</div>
						<h2 className="text-xl font-semibold mb-4">
							Are you sure you want to deactivate this banner?
						</h2>
						<p className="text-gray-700 mb-6">
							By clicking on &quot;Deactivate Banner&quot;, you acknowledge that
							you have verified you want to block the access of using
							the banner in the system. If you are not sure, please
							cancel.
						</p>
						<div className="flex justify-center gap-4">
							<button
								onClick={onClose}
								className="px-5 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
							>
								Cancel
							</button>
							<button
								className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
								onClick={onClose}
							>
								Deactivate Banner
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeactivatePopup;
