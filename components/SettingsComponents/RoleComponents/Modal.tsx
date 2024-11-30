import React, { FC } from "react";
import { BsX } from "react-icons/bs";

interface ModalProps {
	show: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({
	show,
	onClose,
	title,
	children,
}) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="bg-white max-w-lg w-full mx-4 rounded-md shadow-lg flex flex-col overflow-hidden">
				<div className="p-4 flex justify-between items-center border-b">
					<h2 className="text-xl font-semibold">{title}</h2>
					<div
						className="text-gray-600 text-xl h-[30px] w-[30px] hover:bg-gray-400 cursor-pointer rounded-full transition-all duration-300 flex items-center justify-center"
						onClick={onClose}
					>
						<BsX size={25} />
					</div>
				</div>
				<div className="p-4 overflow-y-auto">{children}</div>
			</div>
		</div>
	);
};

export default Modal;
