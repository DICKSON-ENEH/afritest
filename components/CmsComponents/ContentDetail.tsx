import React, { FC, useState } from "react";
import { HistoryItem } from "./History";
import { FaEllipsisV } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

interface iContentDetail {
	selectedHistoryItem?: HistoryItem | null;
	showDetails?: boolean;
	closeDetails?: () => void;
}

const ContentDetail: FC<iContentDetail> = ({
	selectedHistoryItem,
	showDetails,
	closeDetails,
}) => {
	const [state, setState] = useState<boolean>(false);

	const hide = () => {
		closeDetails!();

		const timeout = setTimeout(() => {
			setState(true);
		}, 1000);
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
					showDetails && selectedHistoryItem
						? "opacity-100 visible"
						: "opacity-0 invisible"
				}`}
				onClick={hide}
			></div>
			<div
				className={`fixed top-0 right-0 w-[370px] min-h-screen bg-white z-50 transition-transform duration-1000 overflow-y-auto ${
					showDetails && selectedHistoryItem
						? "transform translate-x-0"
						: "transform translate-x-full"
				}`}
			>
				<h2 className="font-bold mb-3 text-[17px] px-5 py-5 border-b flex justify-between items-center">
					<p>Content Details</p>
					<div className="flex gap-3 items-center">
						<div className="w-10 h-10 flex items-center justify-center hover:bg-gray-300 transition-all duration-300 cursor-pointer rounded-full">
							<FaEllipsisV
								color="gray"
								size={20}
							/>
						</div>
						<ImCancelCircle
							size={24}
							className="cursor-pointer"
							onClick={closeDetails}
						/>
					</div>
				</h2>
				<div className="px-5 text-gray-500 text-[15px]">
					<p className="border-b py-5 flex justify-between items-center">
						Date Created
						<div className="text-black">
							{selectedHistoryItem?.dateCreated}
						</div>
					</p>
					<p className="border-b py-5 flex justify-between items-center">
						Status
						<button
							className={`btn-xs w-36 h-9 rounded-full flex items-center justify-center ${selectedHistoryItem?.statusClass}`}
						>
							{selectedHistoryItem?.status === "ACTIVE" && (
								<div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
							)}
							{selectedHistoryItem?.status === "EXPIRED" && (
								<div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
							)}
							{selectedHistoryItem?.status === "SCHEDULED" && (
								<div className="w-3 h-3 bg-[#ff9800] rounded-full mr-2"></div>
							)}
							{selectedHistoryItem?.status === "DEACTIVATED" && (
								<div className="w-3 h-3 bg-[#494a53] rounded-full mr-2"></div>
							)}
							<span className="font-semibold">
								{selectedHistoryItem?.status}
							</span>
						</button>
					</p>
					<p className="border-b py-5 flex justify-between items-center">
						Author
						<div className="text-black">
							{selectedHistoryItem?.author}
						</div>
					</p>
					<p className="border-b py-5 flex justify-between items-center">
						Platform
						<div className="text-black">
							{selectedHistoryItem?.platform}
						</div>
					</p>
					<p className="border-b py-5 flex justify-between items-center">
						Title
						<div className="text-black">
							{selectedHistoryItem?.title}
						</div>
					</p>
					<p className="py-5">
						Description <br />
						<div className="text-black mt-2">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Maxime veniam reiciendis aliquam odio dolores neque
							quasi perferendis, quis dolorum maiores labore vel
							assumenda natus harum. Quia nisi eveniet odio, magnam
							quod fuga maiores, officiis veniam perferendis at
							tempora quos? Beatae?
						</div>
					</p>
				</div>
			</div>
		</>
	);
};

export default ContentDetail;
