import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { BsEye, BsFillPersonFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import { useAddCMSMutation, useUpdateCMSMutation } from '../../redux/services/cms'
import { iCMS } from '../../utils/types'
import { toast } from 'react-toastify'

const PostEditor = ({ postToEdit }: { postToEdit?: iCMS }) => {
	const isEdit = postToEdit ? true : false

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [postDate, setPostDate] = useState<any>('')
	const [expiryDate, setExpiryDate] = useState<any>('')
	const [image, setImage] = useState<File | any>(null)
	const [caption, setCaption] = useState('')
	const [url, setUrl] = useState('')
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
	const [selectedPath, setSelectedPath] = useState('') // Path selection
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	useEffect(() => {
		if (isEdit) {
			setTitle(postToEdit?.title || '')
			setDescription(postToEdit?.description || '')
			setCaption(postToEdit?.caption || '')
			setUrl(postToEdit?.url || '')
			setImage(postToEdit?.image || null)
			setPostDate(postToEdit?.postDate || "")
			setExpiryDate(postToEdit?.expiryDate)
			setSelectedPath(postToEdit?.path[0] || "")
			// setIsPreviewOpen(true)
		}
	}, [postToEdit])

	const paths = ['In App', 'URL', 'Push Notification', 'Email', 'Blog'] // Dropdown paths

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			console.log(e.target.files[0])
			setImage(e.target.files[0])
		}
	}

	const handleDelete = () => {
		setIsDeletePopupOpen(true)
	}

	const closeDeletePopup = () => {
		setIsDeletePopupOpen(false) // Close the delete popup
	}

	const confirmDelete = () => {
		// Perform delete action here
		setImage(null)
		setCaption('')
		setUrl('')
		closeDeletePopup() // Close the popup after deleting
	}

	const handlePreview = () => {
		setIsPreviewOpen(true)
	}

	const closePreview = () => {
		setIsPreviewOpen(false)
	}

	const handlePathSelect = (path: any) => {
		setSelectedPath(path)
		setIsDropdownOpen(false) // Close the dropdown after selection
	}

	const [value, setValue] = useState('')

	const toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
		['link', 'image', 'video', 'formula'],

		[{ header: 1 }, { header: 2 }],
		[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
		[{ script: 'sub' }, { script: 'super' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ direction: 'rtl' }],

		[{ size: ['small', false, 'large', 'huge'] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],

		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],

		['clean'],
	]
	const [addCMS, { isLoading }] = useAddCMSMutation()
	const [updateCMS, { isLoading: updateIsProcessing }] = useUpdateCMSMutation()

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
		formData.append('file', image as File)
		formData.append('upload_preset', 'ml_default')
		const platform = formData.get('platform') as string

		const { secure_url } = await fetch(
			'https://api.cloudinary.com/v1_1/dvtisceko/image/upload',
			{
				method: 'POST',
				body: formData,
			}
		).then(async (res) => await res.json())

		const CMS: iCMS = {
			title,
			caption,
			expiryDate,
			description,
			postDate,
			image: secure_url,
			path: [selectedPath],
			platform,
			url,
		}

		try {
			const response = isEdit
				? await updateCMS({ id: postToEdit?._id, body: CMS }).unwrap()
				: await addCMS(CMS).unwrap()
			console.log('this is response', response)

			if (response.status === true) {
				toast.success(response.data?.message)
				console.log(response.data?.message)
			}
		} catch (error: any) {
			if (error) {
				const errorMessage = error.data?.data?.message || 'Bad request error'
				toast.error(errorMessage)
			}
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-between p-4 mx-auto rounded-md w-full"
		>
			{/* Left Text Editor Section */}

			<div className="w-[70%] ">
				<div className="bg-[#f4f7fa] min-h-[500px] p-10 rounded-lg">
					<div className=" min-h-[350px]">
						<input
							type="text"
							value={title}
							onChange={(e: ChangeEvent<HTMLInputElement>) =>
								setTitle(e.target.value)
							}
							placeholder="Title"
							className="border-b mb-2 h-[40px] top-5 w-[100%] font-bold pl-3 bg-transparent rounded-md"
						/>

						<textarea
							value={description}
							onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
								setDescription(e.target.value)
							}
							placeholder="Description"
							className="w-full h-[300px] p-2 border rounded"
						/>
					</div>
				</div>

				<div className="w-full mt-10 bg-[#f4f7fa] flex justify-center items-center rounded-lg">
					<div className="mx-auto p-6 rounded-md w-[95%]">
						<div className="grid grid-cols-3 gap-4 items-center">
							{/* Image Row */}
							<div className="col-span-3">
								<div className="flex justify-between items-center w-full p-4">
									
									<label className="font-semibold text-green-600">Image</label>

									{/* Delete Button */}
									<div className="flex items-center gap-1 bg-white h-12 w-auto px-4 justify-center text-red-500 font-bold rounded-md cursor-pointer">
										<RiDeleteBinLine color="red" />
										Delete
									</div>
								</div>
							</div>

							{/* Upload Image Label and Input */}
							<label className="text-gray-700">Upload Image</label>
							<div className="border border-dashed border-gray-300 p-4 rounded-md col-span-2 bg-white">
								<label
									htmlFor="upload"
									className="block text-center text-green-600 cursor-pointer"
								>
									<span>
										{image?.name! || 'Click to upload or drag and drop'}
									</span>
								</label>
								<input
									id="upload"
									type="file"
									// required
									name="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageUpload}
								/>
							</div>

							{/* Caption Label and Input */}
							<label className="text-gray-700">Caption</label>
							<input
								type="text"
								required
								placeholder="Caption"
								className="col-span-2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								value={caption}
								onChange={(e) => setCaption(e.target.value)}
							/>

							{/* URL Label and Input */}
							<label className="text-gray-700">Url</label>
							<input
								type="text"
								required
								placeholder="Url"
								className="col-span-2 mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
								value={url}
								onChange={(e) => setUrl(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Right Settings Section */}
			<div className="w-[27%]">
				{/* Top buttons */}
				<div className="flex justify-between items-center mb-4">
					<button
						className="flex items-center space-x-2 px-3 py-2 border rounded-md"
						onClick={handlePreview}
					>
						<BsEye className="text-gray-700" />
						<span className="text-gray-700">Preview</span>
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-green-600 text-white rounded-md"
					>
						{isLoading ? 'Saving...' : 'Save'}
						{/* {isLoading ? 'Saving...' : 'Save'} */}

					</button>
				</div>

				{/* Author section */}
				<div className="flex items-center mb-4">
					<BsFillPersonFill className="text-gray-700 w-8 h-8 mr-2" />
					<div>
						<span className="block font-semibold text-green-600">Author</span>
						<span className="text-gray-700">Moses Jacob</span>
					</div>
				</div>

				{/* Post date */}
				<div className="bg-white p-4 border rounded-md mb-4">
					<label className="block font-semibold mb-1">Post date</label>
					<div className="flex space-x-2">
						<input
							type="date"
							className="w-1/2 p-2 border rounded-md"
							// required
							value={postDate}
							onChange={(e) => setPostDate(e.target.value)}
						/>
						<input
							type="time"
							className="w-1/2 p-2 border rounded-md"
							// required
						/>
					</div>

					<label className="block font-semibold mb-1 mt-4">Expiry date</label>
					<div className="flex space-x-2">
						<input
							type="date"
							className="w-1/2 p-2 border rounded-md"
							// required
							value={expiryDate}
							onChange={(e) => setExpiryDate(e.target.value)}
						/>
						<input
							type="time"
							// required
							className="w-1/2 p-2 border rounded-md"
						/>
					</div>
				</div>

				{/* Custom Dropdown for Path */}
				<div className="bg-white p-4 border rounded-md mb-4 relative">
					<label className="block font-semibold mb-1">Path</label>
					<div
						className="w-full p-2 border rounded-md text-gray-700 cursor-pointer"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						{selectedPath || 'Select Path'}
					</div>

					{/* Dropdown menu */}
					{isDropdownOpen && (
						<div className="absolute z-10 bg-white border rounded-md w-full mt-2 shadow-lg">
							{paths.map((path, index) => (
								<div
									key={index}
									className="p-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
									onClick={() => handlePathSelect(path)}
								>
									<span>{path}</span>
									{selectedPath === path && (
										<AiOutlineCheckCircle className="text-green-600" />
									)}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="bg-white p-4 border rounded-md">
					<label className="block font-semibold mb-1">Platform</label>
					<select
						required
						name="platform"
						className="w-full p-2 border rounded-md text-gray-700"
					>
						<option>{'Select Platform'}</option>
					</select>
				</div>
			</div>

			{/* Preview Modal */}
			{isPreviewOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white w-[50%] max-h-[80%] overflow-y-auto p-6 rounded-md shadow-lg relative">
						<button
							className="absolute top-4 right-4 text-gray-700 hover:bg-slate-400 rounded-lg"
							onClick={closePreview}
						>
							<IoClose size={30} />
						</button>
						<h2 className="text-lg font-semibold mb-2">{title}</h2>
						<div
							className="text-gray-700"
							dangerouslySetInnerHTML={{ __html: `${value}` }}
						/>
					</div>
				</div>
			)}

			{/* Delete Confirmation Popup */}
			{isDeletePopupOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white w-[40%] p-4 rounded-lg shadow-lg relative">
						<p className="text-lg font-semibold mb-4">
							Are you sure you want to delete this content?
						</p>
						<div className="flex justify-end space-x-4">
							<button
								className="px-4 py-2 bg-gray-300 rounded-md"
								onClick={closeDeletePopup}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-red-600 text-white rounded-md"
								onClick={confirmDelete}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</form>
	)
}

export default PostEditor
