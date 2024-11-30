// import { HistoryAction } from '@/components/CmsComponents.tsx/Action'
// import { useDeleteCMSMutation, useGetCMSQuery } from '@/Redux/services/cms'
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import ContentDetail from './ContentDetail'
import { HistoryAction } from './Action'
import { useDeleteCMSMutation, useGetCMSQuery } from '../../redux/services/cms'

export interface HistoryItem {
	title: string
	platform: string
	author: string
	dateCreated: string
	status: string
	statusClass: string
}

const history: HistoryItem[] = [
	{
		title: 'Get Connected Faster',
		platform: 'User Mobile App',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'EXPIRED',
		statusClass: 'bg-red-100 text-red-500',
	},
	{
		title: 'Get Connected Faster',
		platform: 'User Mobile App',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'DEACTIVATED',
		statusClass: 'bg-[#f4f7fa] text-[#494a53]',
	},
	{
		title: 'Get Connected Faster',
		platform: 'User Mobile App',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'SCHEDULED',
		statusClass: 'bg-[#ffe3ba] text-[#ff9800]',
	},
	{
		title: 'Get Connected Faster',
		platform: 'User Mobile App',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'ACTIVE',
		statusClass: 'bg-[#f3ffeb] text-green-700',
	},
	{
		title: 'Get Connected Faster',
		platform: 'Admin',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'EXPIRED',
		statusClass: 'bg-red-100 text-red-500',
	},
	{
		title: 'Get Connected Faster',
		platform: 'Admin',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'ACTIVE',
		statusClass: 'bg-[#f3ffeb] text-green-700',
	},
	{
		title: 'Get Connected Faster',
		platform: 'Admin',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'SCHEDULED',
		statusClass: 'bg-[#ffe3ba] text-[#ff9800]',
	},
	{
		title: 'Get Connected Faster',
		platform: 'Admin',
		author: 'Moses Jacob',
		dateCreated: '1st July, 2023 02:54PM',
		status: 'DEACTIVATED',
		statusClass: 'bg-[#f4f7fa] text-[#494a53]',
	},
]

const History: React.FC = () => {
	const [showDropdown, setShowDropdown] = useState<number | null>(null)
	const [showDetails, setShowDetails] = useState<boolean>(false)
	const [selectedHistoryItem, setSelectedHistoryItem] =
		useState<HistoryItem | null>(null)

	const toggleDropdown = (index: number) => {
		setShowDropdown((prev) => (prev !== null ? null : index))
	}
	const { data: history, isLoading, isError, error } = useGetCMSQuery([] as any)
	console.log('this is history', history)
	const handleViewDetails = (item: HistoryItem) => {
		setSelectedHistoryItem(item)
		setShowDetails(true)
		setShowDropdown(null)
	}

	const [deleteCMS, { isLoading: deletionIsProcessing }] =
		useDeleteCMSMutation()
	const handleDeleteCMS = async (id: { id: string }) => {
		try {
			const response = await deleteCMS(id).unwrap()
			console.log(response)
		} catch (error: any) {
			console.log(error)
		}
	}

	const closeDetails = () => {
		setShowDetails(false)

		const timeout = setTimeout(() => {
			setSelectedHistoryItem(null)
			clearTimeout(timeout)
		}, 1000)
	}

	return (
		<div className="mt-7">
			<div className="overflow-hidden">
				<ContentDetail
					closeDetails={closeDetails}
					selectedHistoryItem={selectedHistoryItem}
					showDetails={showDetails}
				/>
			</div>
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="w-full border-b text-[#494a53]">
							<th className="px-4 py-2 text-center">Title</th>
							<th className="px-4 py-2 text-center">Platform</th>
							<th className="px-4 py-2 text-center">Author</th>
							<th className="px-4 py-2 text-center">Date Created</th>
							<th className="px-4 py-2 text-center">Status</th>
							<th className="px-4 py-2 text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{history?.data.cms.map((el: any, index: any) => (
							<tr className="border-b text-[#494a53]" key={index}>
								<td className="px-4 py-2 text-center">
									<div className="text-[13px] font-semibold text-[#1da96d] capitalize">
										{el.title}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center justify-center">
										<div className="font-semibold text-[13px]">
											{el.platform.replaceAll('_', ' ')}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center justify-center">
										<div className="font-semibold text-[13px]">{el.author}</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center justify-center">
										<div className="font-semibold text-[13px]">
											{new Date(el.createdAt).toLocaleDateString()}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center justify-center">
										<button
											className={`btn-xs w-36 h-9 rounded-full flex items-center justify-center 
						${
							el.status.toLowerCase() === 'active'
								? 'bg-green-200'
								: el.status.toLowerCase() === 'expired'
								? 'bg-red-200'
								: el.status.toLowerCase() === 'scheduled'
								? 'bg-orange-200'
								: el.status.toLowerCase() === 'deactivated'
								? 'bg-slate-300'
								: 'bg-black/10'
						}`}
										>
											{el.status.toLowerCase() === 'ACTIVE'.toLowerCase() && (
												<div className="w-3 h-3 bg-green-700 rounded-full mr-2"></div>
											)}
											{el.status.toLowerCase() === 'EXPIRED'.toLowerCase() && (
												<div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
											)}
											{el.status.toLowerCase() ===
												'SCHEDULED'.toLowerCase() && (
												<div className="w-3 h-3 bg-[#ff9800] rounded-full mr-2"></div>
											)}
											{el.status.toLowerCase() ===
												'Deactivated'.toLowerCase() && (
												<div className="w-3 h-3 bg-[#494a53] rounded-full mr-2"></div>
											)}
											<span className="font-semibold">{el.status}</span>
										</button>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center justify-center">
										<HiOutlineDotsVertical
											className="cursor-pointer w-10 h-10 p-2 rounded-full hover:rotate-90 transition-all duration-300 hover:bg-slate-50"
											size={20}
											onBlur={() => setShowDropdown(null)}
											cursor="pointer"
											onClick={() => toggleDropdown(index)}
										/>
										{showDropdown === index && (
											<HistoryAction
												onViewDetails={() => handleViewDetails(el)}
												onDeleteCMS={() => handleDeleteCMS(el._id)}
											/>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default History
