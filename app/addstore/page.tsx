'use client'

import React, { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { TbFileUpload, TbPlus } from 'react-icons/tb'
import { TfiBackRight } from 'react-icons/tfi'
import { IoIosArrowBack } from 'react-icons/io'
import Select from 'react-select'
import { CiImageOn } from 'react-icons/ci'

// import { VendorInfo } from '@/utils/types'
// import { useAddVendorMutation } from '@/Redux/services/vendorApi'
import { toast } from 'react-toastify'
import { VendorInfo } from 'utils/types'
import { useAddVendorMutation } from '../../redux/services/vendorApi'

interface FormData {
	firstName: string
	lastName: string
	email: string
	country: string
	phoneNumber: string
	businessName: string
	businessEmail: string
	city: string
	businessPhoneNumber: string
	businessType: string[]
	businessCategory: string[]
	logo: File | null
	coverPic: File | null
}

const AddStoreForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
	const [currentStep, setCurrentStep] = useState(1)
	const [showAddAccountModal, setShowAddAccountModal] = useState<boolean>(false)
	const [formData, setFormData] = useState<VendorInfo>({

		first_name: '',
		last_name: '',
		email: '',
		country: '',
		phone_number: '',
		business_name: '',
		business_email: '',
		business_city: '',
		business_country_location: '',
		business_phone_number: '',
		business_type: [],
		business_category: [],
		business_logo_img: '',
		business_cover_page_img: '',
		business_support_phone_number: '',
		business_support_email: '',
		business_tax_identification_doc: '',
		business_id_card_doc: '',
		business_certificate_of_incorperation_doc: '',
		business_menulist_of_product_doc: '',
		business_account: { bank_name: '', account_name: '', account_number: '' },
	})

	console.log(formData)

	// const [addVendor, { isLoading }] = useAddVendorMutation()

	const [addVendor, { isLoading: addIsProcessing }] = useAddVendorMutation()

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files, id } = e.target
		if (files && files.length > 0) {
			const file = files[0]
			const localFilePath = URL.createObjectURL(file)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'ml_default')

			const { secure_url } = await fetch(
				'https://api.cloudinary.com/v1_1/dvtisceko/image/upload',
				{
					method: 'POST',
					body: formData,
				}
			).then(async (res) => await res.json())
			setFormData((prev) => ({ ...prev, [id]: localFilePath }))
		}
	}

	const handleTaxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('got to tax upload')
		const { files, id } = e.target
		// && files[0]?.type === 'application/pdf' // add this to the if statement to allow only pdf files. i removed it for testing purposes
		if (files && files.length > 0) {
			const file = files[0]
			const localFilePath = URL.createObjectURL(file)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'ml_default')

			const { secure_url } = await fetch(
				'https://api.cloudinary.com/v1_1/dvtisceko/image/upload',
				{
					method: 'POST',
					body: formData,
				}
			).then(async (res) => await res.json())
			setFormData((prev) => ({ ...prev, [id]: localFilePath }))
		}
	}

	const handleContinue = () => {
		if (isStepValid()) {
			if (currentStep < 4) {
				setCurrentStep(currentStep + 1)
			}
		} else {
			alert(
				'Please fill out all required fields or upload necessary documents.'
			)
		}
		if (currentStep >= 4) {
			try {
				const result:any = addVendor(formData).unwrap()
				console.log('this is response', result)
				if (result.status === true) {
					toast.success(result?.data?.message)
					console.log(result.data?.message)
				console.log('this is response', result)

					setCurrentStep(1)
				}
			} catch (error: any) {
				if (error) {
					const errorMessage = error.data?.data?.message || 'Bad request error'
					toast.error(errorMessage)
				}
			}
		}
	}

	const isStepValid = () => {
		if (currentStep === 1) {
			return (
				formData.first_name &&
				formData.last_name &&
				formData.email &&
				formData.country &&
				formData.phone_number
			)
		}
		return true
	}

	const isStepCompleted = (step: number) => step < currentStep

	const stepTitles = [
		'Owner’s Information',
		'Business Profile',
		'Business Documents',
		'Bank Information',
	]
	const stepDescriptions = [
		'Here are some of the details about the owner.',
		'Here are some of the details about the business.',
		'Upload necessary business documents.',
		'Enter your bank information for payments.',
	]

	return (
		<div className="p-6 bg-white rounded-lg w-full mx-auto mt-10">
			<div className="flex items-center mb-6">
				<button onClick={() => window.history.back()} className="text-lg">
					<IoIosArrowBack className="mr-2" />
				</button>
				<h2 className="text-lg font-semibold">Add Store</h2>
			</div>

			<div className="flex items-center space-x-4 mb-6">
				{[
					'Owner Details',
					'Business Profile',
					'Business Documents',
					'Bank Information',
				].map((step, index) => (
					<div key={index} className="flex items-center">
						<div
							className={`flex items-center justify-center w-6 h-6 border rounded-full mr-2 text-sm ${
								isStepCompleted(index + 1)
									? 'border-green-400 text-green-400'
									: currentStep === index + 1
									? 'border-orange-400 text-orange-400'
									: 'border-gray-500 text-gray-500'
							}`}
						>
							{isStepCompleted(index + 1) ? '✓' : index + 1}
						</div>
						<span
							className={`text-sm ${
								isStepCompleted(index + 1)
									? 'text-green-400'
									: currentStep === index + 1
									? 'text-orange-400'
									: 'text-gray-500'
							}`}
						>
							{step}
						</span>
					</div>
				))}
			</div>

			<div className="flex justify-between items-center">
				<div className="flex-1">
					<h3 className="text-md font-medium mb-2">
						{stepTitles[currentStep - 1]}
					</h3>
					<p className="text-sm text-gray-500 mb-4">
						{stepDescriptions[currentStep - 1]}
					</p>
				</div>
				<div className="flex space-x-4">
					<button
						onClick={onClose}
						className="flex items-center px-4 py-2 border border-gray-300 rounded-md"
					>
						<HiOutlineTrash className="mr-2" />
						Delete
					</button>
					<button
						onClick={handleContinue}
						className="flex items-center px-4 py-2 bg-black text-white rounded-md"
					>
						<TfiBackRight className="mr-2" />
						Continue
					</button>
				</div>
			</div>

			<div className="mt-6">
				{currentStep === 1 && (
					<div className="flex flex-col space-y-4">
						<div className="w-full md:w-1/2">
							<label className="block text-sm font-medium mb-1 ">
								First Name
							</label>
							<input
								name="first_name"
								className="w-full px-4 py-2 border rounded-md outline-none text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
								type="text"
								placeholder="Moses"
								value={formData.first_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<label className="block text-sm font-medium mb-1 ">
								Last Name
							</label>
							<input
								name="last_name"
								className="w-full px-4 py-2 border rounded-md outline-none text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500"
								type="text"
								placeholder="Jacob"
								value={formData.last_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<label className="block text-sm font-medium mb-1 ">
								Email Address
							</label>
							<input
								name="email"
								className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-medium"
								type="email"
								placeholder="Mosesjacob@gmail.com"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<label className="block text-sm font-medium mb-1 ">Country</label>
							<select
								name="country"
								className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-medium"
								value={formData.country}
								onChange={handleInputChange}
							>
								<option value="">Select a country</option>
								<option value="Nigeria">Nigeria</option>
								{/* Add other options here */}
							</select>
						</div>
						<div className="w-full md:w-1/2">
							<label className="block text-sm font-medium mb-1 ">
								Phone Number
							</label>
							<input
								name="phone_number"
								className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-medium"
								type="text"
								placeholder="234 812 345 6789"
								value={formData.phone_number}
								onChange={handleInputChange}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<div className="text-sm text-green-600 cursor-pointer">
								Generate Password
							</div>
						</div>
					</div>
				)}
				{currentStep === 2 && (
					<div className="flex flex-col space-y-4">
						<div className="flex flex-wrap -mx-2">
							<div className="w-full md:w-1/2 px-2">
								<label className="block text-sm font-medium mb-1">
									Business Name
								</label>
								<input
									name="business_name"
									className="w-full px-4 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
									type="text"
									placeholder="Enter business name"
									value={formData.business_name}
									onChange={handleInputChange}
								/>
							</div>

							

							<div className="w-full md:w-1/2 px-2">
								<label className="block text-sm font-medium mb-1">
									City Where You Operate of Store
								</label>
								<input
									name="business_city"
									className="w-full px-4 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
									type="text"
									placeholder="Enter city"
									value={formData.business_city}
									onChange={handleInputChange}
								/>
							</div>

							<div className="w-full md:w-1/2 px-2 mt-7">
								<label className="block text-sm font-medium mb-1">
									Email Address
								</label>
								<input
									name="business_email"
									className="w-full px-4 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
									type="email"
									placeholder="Enter business email"
									value={formData.business_email}
									onChange={handleInputChange}
								/>
							</div>

							<div className="w-full md:w-1/2 px-2 mt-7">
								<label className="block text-sm font-medium mb-1">
									Phone Number
								</label>
								<input
									name="business_phone_number"
									className="w-full px-4 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
									type="text"
									placeholder="Enter business phone number"
									value={formData.business_phone_number}
									onChange={handleInputChange}
								/>
							</div>

							<div className="w-full md:w-1/2 px-2 mt-7">
								<label className="block text-sm font-medium mb-1 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
									Business Type
								</label>
								<Select
									name="business_type"
									isMulti
									value={formData.business_type.map((type) => ({
										value: type,
										label: type,
									}))}
									onChange={(selectedOptions) =>
										setFormData((prev) => ({
											...prev,
											business_type: selectedOptions.map(
												(option) => option.value
											),
										}))
									}
									options={[
										{ value: 'Retail', label: 'Retail' },
										{ value: 'Services', label: 'Services' },
										// Add more options here
									]}
								/>
							</div>

							<div className="w-full md:w-1/2 px-2 mt-7">
								<label className="block text-sm font-medium mb-1">
									Business Category
								</label>
								<Select
									name="business_category"
									isMulti
									value={formData.business_category.map((category) => ({
										value: category,
										label: category,
									}))}
									onChange={(selectedOptions) =>
										setFormData((prev) => ({
											...prev,
											business_category: selectedOptions.map(
												(option) => option.value
											),
										}))
									}
									options={[
										{
											value: 'Food & Beverages',
											label: 'Food & Beverages',
										},
										{ value: 'Fashion', label: 'Fashion' },
										// Add more options here
									]}
								/>
							</div>
						</div>

						<div className="w-full">
									<label className="block text-sm font-medium mb-1">
									Business Country
									</label>
									<input
										name="business_country_location"
										className="w-full px-3 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
										type="text"
										placeholder="Enter business Country"
										value={formData.business_country_location}
										onChange={handleInputChange}
									/>
								</div>

						{/* Logo Upload */}
						<div className="mt-10 border w-full flex justify-center items-center rounded-md">
							<div className="flex w-[97%] justify-between items-center">
								<div>
									<h2 className="text-2xl font-semibold">Logo</h2>
									<div>
										<p className="text-gray-500 text-sm">Business logo</p>
									</div>
								</div>
								<div className="flex items-center">
									{formData.business_logo_img ? (
										<div className="w-[100px] h-[100px] overflow-hidden rounded-full mr-8">
											<img
												src={formData.business_logo_img}
												alt="Selected logo"
												className="object-cover w-full h-full rounded-full"
												width={100}
												height={100}
											/>
										</div>
									) : (
										<CiImageOn className="text-4xl text-gray-500 mr-8" />
									)}
									<label
										htmlFor="business_logo_img"
										className="border-dashed border-2 border-gray-300 p-4 rounded-lg font-semibold cursor-pointer flex justify-center items-center flex-col"
									>
										<div className="rounded-full w-[40px] h-[40px] border flex items-center justify-center mb-2">
											<CiImageOn size={20} />
										</div>
										<button>Click to replace or drag and drop</button>
										<p className="text-sm text-gray-500 mt-1 text-center">
											SVG, PNG, JPG or GIF (max 800 x 400px)
										</p>
										<input
											id="business_logo_img"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleFileUpload}
										/>
									</label>
								</div>
							</div>
						</div>
						{/* Cover Photo Upload */}
						<div className="mt-10 border w-full flex justify-center items-center rounded-md">
							<div className="flex w-[97%] justify-between items-center">
								<div>
									<h2 className="text-2xl font-semibold">Cover Pic</h2>
									<div>
										<p className="text-gray-500 text-sm">Business logo</p>
									</div>
								</div>
								<div className="flex items-center">
									{formData.business_cover_page_img ? (
										<div className="w-[100px] h-[100px] overflow-hidden rounded-full mr-8">
											<img
												src={formData.business_cover_page_img}
												alt="Selected logo"
												className="object-cover w-full h-full rounded-full"
												width={100}
												height={100}
											/>
										</div>
									) : (
										<CiImageOn className="text-4xl text-gray-500 mr-8" />
									)}
									<label
										htmlFor="business_cover_page_img"
										className="border-dashed border-2 border-gray-300 p-4 rounded-lg font-semibold cursor-pointer flex justify-center items-center flex-col"
									>
										<div className="rounded-full w-[40px] h-[40px] border flex items-center justify-center mb-2">
											<CiImageOn size={20} />
										</div>
										<button>Click to replace or drag and drop</button>
										<p className="text-sm text-gray-500 mt-1 text-center">
											SVG, PNG, JPG or GIF (max 800 x 400px)
										</p>
										<input
											id="business_cover_page_img"
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleFileUpload}
										/>
									</label>
								</div>
							</div>
						</div>
						<div className="flex w-[90%] justify-between items-start space-x-4">
							<div className="flex-1">
								<h2 className="font-bold">Support Channels</h2>
								<p className="text-sm">
									Customers can reach out to <br /> you via these mediums
								</p>
								<p className="mt-1 text-green-500">Edit</p>
							</div>
							<div className="w-full max-w-md px-2">
								<div className="w-full mb-7">
									<label className="block text-sm font-medium mb-1">
										Email Address
									</label>
									<input
										name="business_support_email"
										className="w-full px-3 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
										type="email"
										placeholder="Enter business email"
										value={formData.business_support_email}
										onChange={handleInputChange}
									/>
								</div>
								<div className="w-full">
									<label className="block text-sm font-medium mb-1">
										Phone Number
									</label>
									<input
										name="business_support_phone_number"
										className="w-full px-3 py-2 border rounded-md text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
										type="text"
										placeholder="Enter business phone number"
										value={formData.business_support_phone_number}
										onChange={handleInputChange}
									/>
								</div>

							
							</div>
						</div>
					</div>
				)}
				{currentStep === 3 && (
					<div className="p-8 space-y-6">
						<div className="flex flex-col w-fit">
							<div className="mb-2 font-semibold text-gray-700">
								Tax Identification Number (PDF Format)
							</div>
							<label htmlFor="business_tax_identification_doc">
								<div className="text-sm text-gray-500 mt-1 text-center">
									<div className={`flex items-center justify-center w-36 h-12 border-2 border-dashed ${formData.business_tax_identification_doc!== ""?"border-red-500 rounded-md text-red-500 hover:bg-red-50":"border-green-500 rounded-md text-green-500 hover:bg-green-50"} `}>
										<TbFileUpload className="h-5 w-5 mr-2" />
										Upload file
									</div>
								</div>
								<input
									id="business_tax_identification_doc"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleTaxUpload}
								/>
							</label>
						</div>

						<div className="flex flex-col w-fit">
							<div className="mb-2 font-semibold text-gray-700">
								ID card of the business owner (jpeg or PDF format)
							</div>
							<label htmlFor="business_id_card_doc">
								<div className="text-sm text-gray-500 mt-1 text-center">
									<div className={`flex items-center justify-center w-36 h-12 border-2 border-dashed ${formData.business_id_card_doc!== ""?"border-red-500 rounded-md text-red-500 hover:bg-red-50":"border-green-500 rounded-md text-green-500 hover:bg-green-50"} `}>
										<TbFileUpload className="h-5 w-5 mr-2" />
										Upload file
									</div>
								</div>
								<input
									id="business_id_card_doc"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleTaxUpload}
								/>
							</label>
						</div>
						<div className="flex flex-col w-fit">
							<div className="mb-2 font-semibold text-gray-700">
								Certification of incorporation (PDF format)
							</div>
							<label htmlFor="business_certificate_of_incorperation_doc">
								<div className="text-sm text-gray-500 mt-1 text-center">
									<div className={`flex items-center justify-center w-36 h-12 border-2 border-dashed ${formData.	business_certificate_of_incorperation_doc!== ""?"border-red-500 rounded-md text-red-500 hover:bg-red-50":"border-green-500 rounded-md text-green-500 hover:bg-green-50"} `}>
										<TbFileUpload className="h-5 w-5 mr-2" />
										Upload file
									</div>
								</div>
								<input
									id="business_certificate_of_incorperation_doc"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleTaxUpload}
								/>
							</label>
						</div>
						<div className="flex flex-col w-fit">
							<div className="mb-2 font-semibold text-gray-700">
								Submit your menu list of products (jpeg or PDF format)
							</div>
							<label htmlFor="business_menulist_of_product_doc">
								<div className="text-sm text-gray-500 mt-1 text-center">
									<div className={`flex items-center justify-center w-36 h-12 border-2 border-dashed ${formData.	business_menulist_of_product_doc!== ""?"border-red-500 rounded-md text-red-500 hover:bg-red-50":"border-green-500 rounded-md text-green-500 hover:bg-green-50"} `}>
										<TbFileUpload className="h-5 w-5 mr-2" />
										Upload file
									</div>
								</div>
								<input
									id="business_menulist_of_product_doc"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleTaxUpload}
								/>
							</label>
						</div>
					</div>
				)}
				{currentStep === 4 && (
					<div className="flex h-screen">
						<div
							className="flex flex-col items-center justify-center w-64 h-32 border-2 border-gray-200 rounded-lg hover:shadow-md cursor-pointer"
							onClick={() => setShowAddAccountModal(true)}
						>
							<TbPlus className={`${formData.business_account.account_name &&formData.business_account.account_number && formData.business_account.bank_name !==""?"text-red-500 ":"text-green-500 "} text-2xl`} />
							<span className={`${formData.business_account &&formData.business_account.account_number && formData.business_account.bank_name !==""?"text-red-500 ":"text-green-500 "} font-semibold mt-2`}>
								Add new account
							</span>
						</div>
					</div>
				)}

				{showAddAccountModal && (
					<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
						<div className="bg-white max-w-md w-full p-6  rounded-md shadow-lg relative">
							<h2 className="text-lg font-bold">Add New Bank</h2>
							<p className="text-sm text-gray-500">
								Input the details of the new bank
							</p>
							<div className="mt-6 space-y-4">
								<div className=" rounded-md bg-gray-100 flex flex-col">
									<label className="block py-0.5 px-4 text-sm font-medium mb-1 ">
										Bank Name
									</label>
									<select
										name="bank_name"
										className="w-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm font-medium bg-transparent rounded-md"
										value={formData.business_account.bank_name}
										onChange={(e) => {
											setFormData((prev) => ({
												...prev,
												business_account: {
													...prev.business_account,
													bank_name: e.target.value,
												},
											}))
										}}
									>
										<option value="">Select a bank</option>
										<option value="UBA">UBA</option>
										<option value="Kuda">Kuda</option>
									</select>
								</div>
								<div className=" rounded-md bg-gray-100 flex flex-col">
									<label className="block py-0.5 px-4 text-sm font-medium mb-1 ">
										Account Name
									</label>
									<input
										name="account_name"
										className="w-full px-4 py-2 border rounded-md outline-none text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-transparent"
										type="text"
										placeholder="Moses"
										value={formData.business_account.account_name}
										onChange={(e) => {
											setFormData((prev) => ({
												...prev,
												business_account: {
													...prev.business_account,
													account_name: e.target.value,
												},
											}))
										}}
									/>
								</div>
								<div className=" rounded-md bg-gray-100 flex flex-col">
									<label className="block py-0.5 px-4 text-sm font-medium mb-1 ">
										Account Number{' '}
									</label>
									<input
										name="account_number"
										className="w-full px-4 py-2 border rounded-md outline-none text-sm font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-transparent"
										type="text"
										pattern="[0-9]"
										placeholder="22104583625"
										value={formData.business_account.account_number}
										onChange={(e) => {
											setFormData((prev) => ({
												...prev,
												business_account: {
													...prev.business_account,
													account_number: e.target.value,
												},
											}))
										}}
									/>
								</div>
							</div>
							<div className="flex justify-end mt-6">
								<div
									className="btn btn-link px-8"
									onClick={() => setShowAddAccountModal(false)}
								>
									Cancel
								</div>
								<div
									className="btn bg-green-500 text-white/80 rounded-none px-8"
									onClick={() => setShowAddAccountModal(false)}
								>
									Continue
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default AddStoreForm
