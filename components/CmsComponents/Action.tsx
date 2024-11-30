import React from 'react'

export const DraftAction = () => {
	return (
		<div>
			<div className="absolute bg-white border rounded shadow-lg mt-3 py-2 w-44 text-left right-10">
				<div className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold">
					View Content Details
				</div>
				<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
				<div className="block px-4 py-2 text-sm text-[#ff0606] hover:bg-gray-200 w-full cursor-pointer font-bold">
					Delete Content
				</div>
			</div>
		</div>
	)
}

interface HistoryActionProps {
	onViewDetails: () => void
	onDeleteCMS: () => void
}

export const HistoryAction: React.FC<HistoryActionProps> = ({
	onViewDetails,
	onDeleteCMS,
}) => {
	return (
		<div>
			<div className="absolute bg-white border rounded shadow-lg mt-3 py-2 w-44 text-left right-10">
				<div
					className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold"
					onClick={onViewDetails}
				>
					View Content Details
				</div>
				<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
				<div className="block px-4 py-2 text-sm text-[#76777e] hover:bg-gray-200 w-full cursor-pointer font-bold">
					Edit Content
				</div>
				<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
				<div className="block px-4 py-2 text-sm text-[#4caf50] hover:bg-gray-200 w-full cursor-pointer font-bold">
					Suspend Content
				</div>
				<div className="border-t border-gray-400 w-full my-1 font-semibold"></div>
				<div
					className="block px-4 py-2 text-sm text-[#ff0606] hover:bg-gray-200 w-full cursor-pointer font-bold"
					onClick={onDeleteCMS}
				>
					Delete Content
				</div>
			</div>
		</div>
	)
}
