'use client'

import React, { useEffect, useState } from 'react'
import { MoreVertical, X, Plus, Check, AlertTriangle } from 'lucide-react'
import {
	useAddPackageCategoryMutation,
	useGetPackageCategoryQuery,
	useUpdatePackageCategoryMutation,
} from '../../redux/services/productsApi'
import { PackageCategoryType } from '../../utils/types'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (data: {
		name: string
		description: string
		category_id: string
	}) => void
}

function Modal({ isOpen, onClose, onSave }: ModalProps) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [category_id] = useState(' ')

	const handleSave = () => {
		onSave({ name, description, category_id })
		setName('')
		setDescription('')
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Create Package Category</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<p className="mb-4 text-sm text-gray-600">
					Kindly input the details of the shipment code you are creating.
				</p>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Package Category Name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Type name"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						name="name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Input Description"
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
						Save Package Category
					</button>
				</div>
			</div>
		</div>
	)
}

interface EditPackageModalProps extends ModalProps {
	category: PackageCategoryType
}

function EditPackageModal({
	isOpen,
	onClose,
	onSave,
	category,
}: EditPackageModalProps) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [category_id, setCategoryId] = useState('')
	useEffect(() => {
		if (category) {
			setName(category.name)
			setDescription(category.description)
			setCategoryId(category.category_id)
		}
	}, [category])

	const handleSave = () => {
		onSave({ name, description, category_id })
		setName('')
		setDescription('')
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-6 rounded-lg w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Create Package Category</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<X className="h-6 w-6" />
					</button>
				</div>
				<p className="mb-4 text-sm text-gray-600">
					Kindly input the details of the shipment code you are creating.
				</p>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Package Category Name
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Type name"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						name="name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Category Id
					</label>
					<input
						type="text"
						value={category_id}
						onChange={(e) => setCategoryId(e.target.value)}
						placeholder="Type category"
						className="w-full px-3 py-2 border border-gray-300 rounded-md"
						name="category id"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Input Description"
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
						Save Package Category
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
					<h2 className="text-xl font-bold mb-2">Package Category Deleted</h2>
					<p className="text-gray-600 text-center">
						{message || 'You have deleted the package category successfully.'}
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
						Are you sure you want to delete this package category?
					</h2>
				</div>
				<p className="text-gray-600 text-center mb-6">
					By clicking on &quot;Delete Package Category&quot;, you acknowledge
					that you have verified you want to take off the shipment code from the
					system. Action cannot be undone. If you are not sure, please cancel.
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
						Delete Package Category
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
}

function Dropdown({ onEdit, onDeactivate, onDelete }: DropdownProps) {
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
				<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
					<div className="py-1">
						<button
							onClick={() => {
								onEdit()
								setIsOpen(false)
							}}
							className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						>
							Edit Package Category
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

export default function PackageCategory() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isEditPackageModalOpen, setIsEditPackageModalOpen] =
		useState<boolean>(false)
	const [categoryToEdit, setCategoryToEdit] =
		useState<PackageCategoryType | null>(null)
	const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
		useState(false)
	const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

	const [successMessage, setSuccessMessage] = useState('')

	const {
		data: categories,
		isLoading,
		error,
	} = useGetPackageCategoryQuery(undefined)

	console.log('Response from query: ', categories, error, isLoading)
	console.log(categories?.data?.packages)

	const [
		addPackageCategory,
		{ isLoading: additionIsLoading, error: additionError },
	] = useAddPackageCategoryMutation()

	const [
		updatePackageCategory,
		{ isLoading: updateIsLoading, error: updateError },
	] = useUpdatePackageCategoryMutation()

	const handleSaveCategory = async (newCategory: {
		name: string
		description: string
	}) => {
		try {
			const response = await addPackageCategory(newCategory).unwrap()
			console.log('Response from mutation', response)
			if (response.status) {
				setIsModalOpen(false)
				setIsSuccessModalOpen(true)
			}
		} catch (error: any) {
			console.log(error)
			// console.log(error.message)
		}
	}

	const handleEdit = (category: PackageCategoryType) => {
		setCategoryToEdit(category)
		setIsEditPackageModalOpen(true)
	}

	const handleSaveEditPackage = async (
		category: Partial<PackageCategoryType>
	) => {
		const response = await updatePackageCategory({
			id: categoryToEdit?._id as string,
			body: category,
		}).unwrap()
		console.log('Response from edit mutation: ', response)
		if (response.status) {
			setIsEditPackageModalOpen(false)
			setIsSuccessModalOpen(true)
		}
	}

	const handleDeactivate = (index: number) => {
		// setCategories(
		// 	categories.map((category, i) =>
		// 		i === index ? { ...category, status: 'Inactive' } : category
		// 	)
		// )
	}

	const handleDelete = (index: number) => {
		setCategoryToDelete(index)
		setIsConfirmDeleteModalOpen(true)
	}

	const confirmDelete = () => {
		if (categoryToDelete !== null) {
			// setCategories(categories.filter((_, i) => i !== categoryToDelete))
			setIsConfirmDeleteModalOpen(false)
			setCategoryToDelete(null)
			setSuccessMessage('You have deleted the package category successfully.')
			setIsSuccessModalOpen(true)
		}
	}

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-4 sm:space-y-0">
				<h1 className="text-2xl font-bold">Package Category</h1>
				<button
					className="bg-green-500 text-white px-4 py-2 rounded flex items-center w-full sm:w-auto justify-center sm:justify-start"
					onClick={() => setIsModalOpen(true)}
				>
					<Plus className="h-5 w-5 mr-2" />
					Add Package Category
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded shadow">
					<div className="text-3xl font-bold">18</div>
					<div className="text-sm text-gray-500">PACKAGE CATEGORY</div>
				</div>
				<div className="bg-white p-4 rounded shadow">
					<div className="text-3xl font-bold">46</div>
					<div className="text-sm text-gray-500">ACTIVE</div>
				</div>
				<div className="bg-white p-4 rounded shadow">
					<div className="text-3xl font-bold">52</div>
					<div className="text-sm text-gray-500">INACTIVE</div>
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
								Name
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
						{categories?.data?.packages.map(
							(category: PackageCategoryType, index: number) => (
								<tr key={index}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="text-sm font-medium text-green-600">
											{category.name}
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
											onEdit={() => handleEdit(category)}
											onDeactivate={() => handleDeactivate(index)}
											onDelete={() => handleDelete(index)}
										/>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
			<div className="flex  flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
				<div className="text-sm text-gray-600">1 - 10 of 25</div>
				<div className="flex gap-2">
					{[1, 2, 3, 4].map((page) => (
						<button
							key={page}
							className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
						>
							{page}
						</button>
					))}
				</div>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSaveCategory}
			/>
			<EditPackageModal
				isOpen={isEditPackageModalOpen}
				onClose={() => setIsEditPackageModalOpen(false)}
				onSave={handleSaveEditPackage}
				category={categoryToEdit as PackageCategoryType}
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
