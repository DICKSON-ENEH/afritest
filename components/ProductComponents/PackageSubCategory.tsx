'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, X, Plus, Check, AlertTriangle } from 'lucide-react'
// import { PackageCategoryType, SubPackageCategoryType } from '@/utils/types'
import { useActivateSubPackageCategoryMutation, useAddSubPackageCategoryMutation, useDeactivateSubPackageCategoryMutation, useDeleteSubPackageCategoryMutation, useGetAllSubPackageCategoryQuery, useGetPackageCategoryQuery } from '../../redux/services/productsApi'
import { PackageCategoryType, SubPackageCategoryType } from 'utils/types'
// import {
// 	useActivateSubPackageCategoryMutation,
// 	useAddSubPackageCategoryMutation,
// 	useDeactivateSubPackageCategoryMutation,
// 	useDeleteSubPackageCategoryMutation,
// 	useGetAllSubPackageCategoryQuery,
// 	useGetPackageCategoryQuery,
// } from '@/Redux/services/productsApi'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (data: Partial<SubPackageCategoryType>) => void
}

function Modal({ isOpen, onClose, onSave }: ModalProps) {
	const {
		data: categories,
		isLoading,
		error,
	} = useGetPackageCategoryQuery(undefined)
	const [name, setName] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [category_id, setCategoryId] = useState<string>('')

	useEffect(() => {
		if (categories) {
			setCategoryId(categories?.data?.packages[0].category_id as string)
		}
	}, [categories])

	if (!isOpen) return null

	const handleSave = () => {
		onSave({ name, description, category_id })
		setName('')
		setDescription('')
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Create Package Sub Category</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<p className="mb-4 text-sm text-gray-600">
					Kindly input the details of the package sub category you are creating.
				</p>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Package Category
					</label>
					<select
						// value={category}
						onChange={(e) => setCategoryId(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
					>
						{categories?.data?.packages.map((category: PackageCategoryType) => (
							<option key={category._id} value={category._id}>
								{category.name}
							</option>
						))}

						{/* <option value="Electronics">Electronics</option>
						<option value="Travel">Travel</option>
						<option value="Telecom">Telecom</option> */}
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Package Name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Men's Wear"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Clothes and accessories that are made for male"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						rows={3}
					/>
				</div>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
					>
						Save Package Sub Category
					</button>
				</div>
			</div>
		</div>
	)
}

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
	message?: string
}

function SuccessModal({ isOpen, onClose, message }: SuccessModalProps) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<div className="flex flex-col items-center">
					<div className="bg-green-500 rounded-full p-2 mb-4">
						<Check className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-xl font-bold mb-2">
						Package Sub Category Created
					</h2>
					<p className="text-gray-600 text-center">
						{message || 'Package Sub Category has been created successfully.'}
					</p>
				</div>
			</div>
		</div>
	)
}

interface ConfirmDeleteModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

function ConfirmDeleteModal({
	isOpen,
	onClose,
	onConfirm,
}: ConfirmDeleteModalProps) {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<div className="flex justify-end">
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<div className="flex flex-col items-center mb-4">
					<div className="bg-red-100 rounded-full p-2 mb-4">
						<AlertTriangle className="h-8 w-8 text-red-600" />
					</div>
					<h2 className="text-xl font-bold mb-2">
						Are you sure you want to delete this package sub category?
					</h2>
				</div>
				<p className="text-gray-600 text-center mb-6">
					By clicking on &quot;Delete Package Sub Category&quot;, you
					acknowledge that you have verified you want to take off the sub
					category from the system. Action cannot be undone. If you are not
					sure, please cancel.
				</p>
				<div className="flex justify-end space-x-2">
					<button
						onClick={onClose}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
					>
						Delete Package Sub Category
					</button>
				</div>
			</div>
		</div>
	)
}

interface DropdownProps {
	onEdit: () => void
	onDeactivate: () => void
	onDelete: () => void
	onActivate: () => void
}

function Dropdown({
	onEdit,
	onDeactivate,
	onDelete,
	onActivate,
}: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="text-gray-400 hover:text-gray-500"
			>
				<MoreVertical className="w-5 h-5" />
			</button>
			{isOpen && (
				<div className="absolute right-0 mt-2 w- bg-white rounded-md shadow-lg z-10">
					<div className="py-1">
						<button
							onClick={() => {
								onEdit()
								setIsOpen(false)
							}}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Edit Package Sub Category
						</button>
						<button
							onClick={() => {
								onActivate()
								setIsOpen(false)
							}}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Activate
						</button>
						<button
							onClick={() => {
								onDeactivate()
								setIsOpen(false)
							}}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Deactivate
						</button>
						<button
							onClick={() => {
								onDelete()
								setIsOpen(false)
							}}
							className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

 const PackageSubCategory=()=> {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
		useState(false)
	const [categoryToEdit, setCategoryToEdit] = useState<SubPackageCategoryType>()

	// const [categories, setCategories] = useState([
	// 	{
	// 		subCategory: "Men's Wear",
	// 		category: 'Fashion',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Active',
	// 	},
	// 	{
	// 		subCategory: "Women's Wear",
	// 		category: 'Fashion',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Inactive',
	// 	},
	// 	{
	// 		subCategory: 'Smartphones',
	// 		category: 'Electronics',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Active',
	// 	},
	// 	{
	// 		subCategory: 'Laptops',
	// 		category: 'Electronics',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Inactive',
	// 	},
	// 	{
	// 		subCategory: 'Luggage',
	// 		category: 'Travel',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Active',
	// 	},
	// 	{
	// 		subCategory: 'SIM Cards',
	// 		category: 'Telecom',
	// 		dateAdded: '19th July, 2023',
	// 		dateModified: '19th July, 2023',
	// 		status: 'Inactive',
	// 	},
	// ])
	const [successMessage, setSuccessMessage] = useState('')

	const [
		addSubPackageCategory,
		{ isLoading: additionIsLoading, error: additionError },
	] = useAddSubPackageCategoryMutation()
	const {
		data: subCategories,
		isLoading,
		error,
	} = useGetAllSubPackageCategoryQuery(undefined)
	console.log(subCategories)

	const [
		deactivateSubPackageCategory,
		{ isLoading: deactivationIsLoading, error: deactivationError },
	] = useDeactivateSubPackageCategoryMutation()

	const [
		activateSubPackageCategory,
		{ isLoading: activationIsLoading, error: activationError },
	] = useActivateSubPackageCategoryMutation()

	const [
		deleteSubPackageCategory,
		{ isLoading: deletionIsLoading, error: deletionError },
	] = useDeleteSubPackageCategoryMutation()

	const handleSaveSubCategory = async (
		newCategory: Partial<SubPackageCategoryType>
	) => {
		try {
			const response = await addSubPackageCategory(newCategory).unwrap()
			console.log('Response from mutation', response)
			if (response.status) {
				setIsModalOpen(false)
				setSuccessMessage('Package Sub Category has been created successfully.')
				setIsSuccessModalOpen(true)
			}
		} catch (error: any) {
			console.log(error)
			// console.log(error.message)
		}
	}

	const handleEdit = (index: number) => {
		// Implement edit functionality
		console.log(`Editing sub category at index ${index}`)
	}

	const handleDeactivate = async (index: number) => {
		try {
			const categoryId = subCategories?.data?.sub_packages[index]._id
			const response = await deactivateSubPackageCategory({
				id: categoryId as string,
			}).unwrap()
			console.log('Response from mutation', response)
			if (response.status) {
				setIsModalOpen(false)
				setSuccessMessage('Package Sub Category has been created deactivated.')
				setIsSuccessModalOpen(true)
			}
		} catch (error: any) {
			console.log(error)
			// console.log(error.message)
		}
	}

	const handleActivate = async (index: number) => {
		try {
			const categoryId = subCategories?.data?.sub_packages[index]._id
			const response = await activateSubPackageCategory({
				id: categoryId as string,
			}).unwrap()
			console.log('Response from mutation', response)
			if (response.status) {
				setIsModalOpen(false)
				setSuccessMessage('Package Sub Category has been created activated.')
				setIsSuccessModalOpen(true)
			}
		} catch (error: any) {
			console.log(error)
			// console.log(error.message)
		}
	}

	const handleDelete = (index: number) => {
		setIsConfirmDeleteModalOpen(true)
		setCategoryToEdit(subCategories?.data?.sub_packages[index])
	}

	const confirmDelete = async () => {
		try {
			const response = await deleteSubPackageCategory({
				id: categoryToEdit?._id as string,
			}).unwrap()
			console.log('Response from mutation', response)
			if (response.status) {
				setIsModalOpen(false)
				setSuccessMessage('Package Sub Category has been created deleted.')
				setIsConfirmDeleteModalOpen(false)
				setIsSuccessModalOpen(true)
			}
		} catch (error: any) {
			console.log(error)
			// console.log(error.message)
		}
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
				<h1 className="text-2xl font-semibold mb-4 sm:mb-0">
					Package Sub Category
				</h1>
				<button
					className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center"
					onClick={() => setIsModalOpen(true)}
				>
					<Plus className="w-5 h-5 mr-2" />
					Add Package Sub Category
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="text-3xl font-bold">18</div>
					<div className="text-sm text-gray-500 uppercase">
						Package Category
					</div>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="text-3xl font-bold">46</div>
					<div className="text-sm text-gray-500 uppercase">Active</div>
				</div>
				<div className="bg-white p-4 rounded-lg shadow">
					<div className="text-3xl font-bold">52</div>
					<div className="text-sm text-gray-500 uppercase">Inactive</div>
				</div>
			</div>

			<div className="bg-white rounded-lg overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Sub Category
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Category
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Date Added
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Date Modified
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Status
							</th>
							<th scope="col" className="relative px-6 py-3">
								<span className="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{subCategories?.data?.sub_packages.map((category:any, index:number) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-green-600">
										{category.name}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-green-600">
										{category.category}
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										{category.createdAt}
									</div>
									<div className="text-sm text-gray-500">12:30 PM</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-gray-900">
										{category.updatedAt}
									</div>
									<div className="text-sm text-gray-500">12:30 PM</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
											category.status === 'Active'
												? 'bg-green-100 text-green-800'
												: 'bg-red-100 text-red-800'
										}`}
									>
										{category.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<Dropdown
										onEdit={() => handleEdit(index)}
										onDeactivate={() => handleDeactivate(index)}
										onDelete={() => handleDelete(index)}
										onActivate={() => handleActivate(index)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex flex-col sm:flex-row justify-between items-center mt-4">
				<div className="text-sm text-gray-700 mb-4 sm:mb-0">1 - 10 of 25</div>
				<nav
					className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
					aria-label="Pagination"
				>
					{[1, 2, 3, 4].map((page) => (
						<button
							key={page}
							className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
								page === 1
									? 'z-10 bg-green-50 border-green-500 text-green-600'
									: 'bg-white  border-gray-300 text-gray-500 hover:bg-gray-50'
							}`}
						>
							{page}
						</button>
					))}
				</nav>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveSubCategory}
			/>
			<SuccessModal
				isOpen={isSuccessModalOpen}
				onClose={() => setIsSuccessModalOpen(false)}
				message={successMessage}
			/>
			<ConfirmDeleteModal
				isOpen={isConfirmDeleteModalOpen}
				onClose={() => setIsConfirmDeleteModalOpen(false)}
				onConfirm={confirmDelete}
			/>
		</div>
	)
}

export default PackageSubCategory