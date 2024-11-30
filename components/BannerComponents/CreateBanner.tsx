"use client";

import React, { useState } from "react";
import Select, { SingleValue, components } from "react-select";
import { GrDocumentText } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { PiUpload } from "react-icons/pi";
import DeactivatePopup from "./DeactivatePopup";
import CreateBannerPopup from "./CreateBannerPopup";

const CreateBanner: React.FC = () => {
	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement | null>(null);
	const [selectedAudience, setSelectedAudience] = useState<any>([]);
	const [selectedPlatform, setSelectedPlatform] = useState<any>([]);
	const [showPopUp, setShowPopUp] = useState(false);
	const [startDate, setStartDate] = useState<string>("");
	const [endDate, setEndDate] = useState<string>("");
	const [startTime, setStartTime] = useState<string>("");
	const [endTime, setEndTime] = useState<string>("");

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files[0]) {
			setUploadedFile(event.target.files[0]);
		}
	};

	const formatFileSize = (size: number) => {
		if (size < 1024) return size + " bytes";
		else if (size >= 1024 && size < 1048576)
			return (size / 1024).toFixed(1) + " KB";
		else if (size >= 1048576)
			return (size / 1048576).toFixed(1) + " MB";
	};

	const handleCancelClick = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.stopPropagation();
		setUploadedFile(null);
	};

	const audienceOptions = [
		{ value: "allUser", label: "All User" },
		{ value: "newUser", label: "New User" },
		{ value: "activeUser", label: "Active User" },
		{ value: "businessAccountType", label: "Business Account Type" },
		{
			value: "individualAccountType",
			label: "Individual Account Type",
		},
	];

	const customStyles = {
		option: (provided: any, state: any) => ({
			...provided,
			display: "flex",
			alignItems: "center",
			backgroundColor: state.isSelected
				? "#f0fdf4"
				: state.isFocused
				? "#e6f7e8"
				: "white",
			color: "black",
			padding: "10px",
			cursor: "pointer",
		}),
		control: (provided: any) => ({
			...provided,
			border: "2px solid #d1d5db",
			borderRadius: "0.375rem",
			padding: "5px",
			cursor: "pointer",
			boxShadow: "none",
			"&:hover": {
				borderColor: "#a3e635",
			},
		}),
		multiValue: (provided: any) => ({
			...provided,
			backgroundColor: "#d1fae5",
		}),
	};

	const platformOptions = [
		{ value: "user-mobile-app", label: "User Mobile App" },
		{ value: "user-web-app", label: "User Web App" },
		{ value: "driver-app", label: "Driver App" },
		{ value: "hub-app", label: "Hub App" },
	];

	const Styles = {
		control: (provided: any) => ({
			...provided,
			borderColor: "#D1D5DB",
			minHeight: "48px",
			boxShadow: "none",
		}),
		option: (provided: any, state: any) => ({
			...provided,
			backgroundColor: state.isSelected
				? "#10B981"
				: state.isFocused
				? "#D1FAE5"
				: "white",
			color: state.isSelected
				? "white"
				: state.isFocused
				? "#065F46"
				: "black",
			padding: "12px 16px",
		}),
		menu: (provided: any) => ({
			...provided,
			marginTop: 0,
			borderRadius: "0.375rem",
		}),
		menuList: (provided: any) => ({
			...provided,
			padding: 0,
		}),
	};

	const CheckboxOption = (props: any) => {
		return (
			<components.Option {...props}>
				<input
					type="checkbox"
					checked={props.isSelected}
					onChange={() => null}
					style={{ marginRight: 10 }}
				/>
				{props.label}
			</components.Option>
		);
	};

	const isFormValid = () => {
		return (
			selectedPlatform &&
			selectedAudience.length > 0 &&
			uploadedFile &&
			startDate &&
			endDate &&
			startTime &&
			endDate
		);
	};

	const handleCreatedClick = () => {
		if (isFormValid()) {
			setShowPopUp(true);
		}
	};

	const handleClosePopup = () => {
		setShowPopUp(false);
	};

	return (
		<>
			<div className="w-[80%]">
				<div className="w-full rounded-lg">
					<h1 className="text-2xl font-bold mb-4">Create Banner</h1>
					<form>
						<div className="mb-4">
							<label className="block text-gray-700">
								Select Platform
							</label>
							<Select
								styles={customStyles}
								options={platformOptions}
								value={selectedPlatform}
								placeholder="Select Platform"
								className="mt-1"
								onChange={setSelectedPlatform}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Target Audience
							</label>
							<Select
								isMulti
								options={audienceOptions}
								components={{ Option: CheckboxOption }}
								styles={customStyles}
								className="w-full mt-1 p-2 border rounded"
								value={selectedAudience}
								onChange={setSelectedAudience}
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Upload Image/Video
							</label>
							<div
								className="border-dashed border-2 border-gray-300 p-4 rounded-lg bg-[#f7fdfb] font-semibold cursor-pointer"
								onClick={handleClick}
							>
								{uploadedFile ? (
									<div className="mt-4 p-2 border rounded-lg bg-white flex justify-between items-center">
										<div className="text-green-500">
											<GrDocumentText size={35} />
										</div>
										<div className="w-[90%]">
											<div className="flex justify-between items-center">
												<span>
													{uploadedFile.name} (
													{formatFileSize(uploadedFile.size)})
												</span>

												<div
													onClick={handleCancelClick}
													className="text-red-500 hover:text-red-700"
												>
													<MdOutlineCancel size={25} />
												</div>
											</div>
											<div className="mt-2 h-2 bg-green-500 rounded-full"></div>
											<span className="text-green-500 font-semibold">
												Completed
											</span>
										</div>
									</div>
								) : (
									<>
										<div className="flex justify-center">
											<PiUpload size={30} />
										</div>
										<p className="text-gray-500">
											<span className="text-green-500 font-semibold">
												Click or drag and drop
											</span>{" "}
											to upload image/video associated with the
											banner. Save document name on uploading PNG, JPG
											(max. 800x400px)
										</p>
									</>
								)}
							</div>
							<input
								type="file"
								className="hidden"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>
						</div>
						<div className="mb-4 flex space-x-4">
							<div className="flex-1">
								<label className="block text-gray-700">
									Start Date
								</label>
								<input
									type="date"
									className="w-full mt-1 p-2 border rounded"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
								/>
							</div>
							<div className="flex-1">
								<label className="block text-gray-700">
									End Date (optional)
								</label>
								<input
									type="date"
									className="w-full mt-1 p-2 border rounded"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
								/>
							</div>
						</div>
						<div className="mb-4 flex space-x-4">
							<div className="flex-1">
								<label className="block text-gray-700">
									Start Time
								</label>
								<input
									type="time"
									className="w-full mt-1 p-2 border rounded"
									value={startTime}
									onChange={(e) => setStartTime(e.target.value)}
								/>
							</div>
							<div className="flex-1">
								<label className="block text-gray-700">
									End Time
								</label>
								<input
									type="time"
									className="w-full mt-1 p-2 border rounded"
									value={endTime}
									onChange={(e) => setEndTime(e.target.value)}
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">
								Link (optional)
							</label>
							<input
								type="url"
								className="w-full mt-1 p-2 border rounded text-green-500"
								placeholder="Input Link"
							/>
						</div>
						<div className="flex justify-end space-x-4">
							<button
								type="button"
								className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300"
							>
								Cancel
							</button>
							<button
								type="button"
								className={`px-4 py-2 border rounded text-white ${
									isFormValid()
										? "hover:bg-green-600 bg-green-500"
										: "bg-gray-400 cursor-not-allowed"
								}`}
								onClick={handleCreatedClick}
								disabled={!isFormValid()}
							>
								Create Banner
							</button>
						</div>
					</form>
				</div>
			</div>
			{showPopUp && <CreateBannerPopup onClose={handleClosePopup} />}
		</>
	);
};

export default CreateBanner;
