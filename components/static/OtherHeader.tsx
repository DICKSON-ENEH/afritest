import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import FilterDropDown from "../HomeComponents/FilterDropDown";
import Export from "../HomeComponents/Export";
import { GoBell } from "react-icons/go";

const OtherHeader = () => {
	const [state, setState] = useState<boolean>(false);
	const [toggle, setToggle] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");

	useEffect(() => {
		setTitle(document.title);
	}, []);

	const toggleDropdown = () => {
		setState(!state);
	};

	const TheToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="w-full flex gap-5">
			<h1 className="text-[30px] font-bold">{title}</h1>

			<div className="w-[500px] text-gray-500 gap-3 outline-0 bg-white border pl-3 flex items-center">
				<BiSearch size={23} />

				<input
					type="text"
					className="w-full h-full outline-0"
					placeholder="Search"
					name=""
					id=""
				/>
			</div>

			<div className="flex gap-4">
				<div
					className="flex gap-3 relative cursor-pointer items-center font-bold bg-gray-200 px-2 py-3"
					onClick={toggleDropdown}
				>
					<div>Filter</div>
					<FaAngleDown size={20} />
					{state && (
						<div
							className="absolute top-[110%] -right-[130%] w-[500px] h-[400px] z-50"
							onClick={(e) => e.stopPropagation()}
						>
							<FilterDropDown />
						</div>
					)}
				</div>
				<div className="relative">
					<div
						className="flex items-center justify-between gap-3 cursor-pointer font-bold bg-gray-200 px-2 py-3"
						onClick={TheToggle}
					>
						<div>Export</div>
						<FaAngleDown size={20} />
					</div>
					{toggle && (
						<div
							className="absolute top-14 right-0 md:right-auto md:left-0 w-[95px] h-[90px] bg-white shadow-lg z-50"
							onClick={(e) => e.stopPropagation()}
						>
							<Export />
						</div>
					)}
				</div>
			</div>
			<div className="flex items-center w-[100%] md:w-[500%] lg:w-[230px]">
				<div className="flex w-full items-center">
					<div className="w-9 h-9 flex border rounded-full items-center justify-center cursor-pointer bg-white">
						{/* Add an image or icon here */}
					</div>
					<div className="ml-2 text-[10px] md:text-[12px] leading-tight">
						<h3>Admin</h3>
						<h1 className="font-bold">Moses Jacob</h1>
					</div>
				</div>
				<div className="hidden lg:block w-[1px] border h-6 mr-3"></div>
				<div className="hidden lg:flex mr-3">
					<GoBell
						cursor="pointer"
						size={20}
					/>
				</div>
			</div>
		</div>
	);
};

export default OtherHeader;
