import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import FilterDropDown from "../HomeComponents/FilterDropDown";
import Export from "../HomeComponents/Export";

const Header = () => {
	const [state, setState] = useState<boolean>(false);
	const [toggle, setToggle] = useState<boolean>(false);

	const toggleDropdown = () => {
		setState(!state);
	};

	const TheToggle = () => {
		setToggle(!toggle);
	};

	return (
		<div className="w-full flex gap-5">
			<h1 className="text-[30px] font-bold">Dashboard</h1>

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
					className="flex gap-3 relative cursor-pointer items-center font-semibold bg-gray-200 px-4 py-3"
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
						className="flex items-center justify-between gap-3 cursor-pointer font-semibold bg-gray-200 px-4 py-3"
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
		</div>
	);
};

export default Header;
