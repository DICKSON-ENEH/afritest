// import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa6";
import { sideData } from "utils/data";
// import { sideData } from "@/utils/sideData";

const LeftContent = () => {
	return (
		<div className="flex flex-col ">
			<div className="border-t border w-full my-1 font-semibold mb-3"></div>
			<div className=" h-[700px] rounded-md border flex justify-center items-center">
				<div className="h-[90%] w-[90%]">
					<h1 className="font-semibold">Recent Activities</h1>
					<div className="flex justify-between items-center">
						<div className="w-[500px] h-11 text-gray-500 gap-3 outline-0 bg-white border pl-3 flex items-center mt-2">
							<BiSearch size={23} />

							<input
								type="text"
								className="w-full h-full outline-0"
								placeholder="Search"
								name=""
								id=""
							/>
						</div>
						<div className="ml-3">
							<button className="flex items-center gap-2 font-bold bg-gray-200 text-gray-700 border rounded-md px-3 py-2 hover:bg-gray-300 ">
								<div>Filter</div>
								<FaAngleDown size={20} />
							</button>
						</div>
					</div>
					<div className="overflow-y-auto h-[550px] mt-5">
						{sideData.map((activity:any, index) => (
							<div
								key={index}
								className={`activity-item mb-2 p-2 rounded-md cursor-pointer flex items-start justify-between hover:bg-[#d3f3e5] `}
							>
								<div className="flex items-start gap-2">
									<div>
										<div className="relative ">
											<div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
											{index !== sideData.length - 1 && (
												<div className="absolute w-px bg-white top-4 bottom-0 left-1.5"></div>
											)}
										</div>
									</div>
									<div>
										<p className="text-sm font-bold text-gray-700">
											{activity.type}
										</p>
										<p className="text-sm text-gray-500">
											{activity.description}
										</p>
									</div>
								</div>
								<div className="text-xs text-gray-400">
									{activity.date}
								</div>
							</div>
						))}
						<div className="border-t border w-full my-1 font-semibold mb-3"></div>
						<div className="flex justify-center items-center">
							<h1>Yesterday</h1>
						</div>
						{sideData.map((activity:any, index) => (
							<div
								key={index}
								className={`activity-item mb-2 p-2 rounded-md cursor-pointer flex items-start justify-between hover:bg-[#d3f3e5] `}
							>
								<div className="flex items-start gap-2">
									<div>
										<div className="relative ">
											<div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
											{index !== sideData.length - 1 && (
												<div className="absolute w-px bg-white top-4 bottom-0 left-1.5"></div>
											)}
										</div>
									</div>
									<div>
										<p className="text-sm font-bold text-gray-700">
											{activity.type}
										</p>
										<p className="text-sm text-gray-500">
											{activity.description}
										</p>
									</div>
								</div>
								<div className="text-xs text-gray-400">
									{activity.date}
								</div>
							</div>
						))}
						<div className="border-t border w-full my-1 font-semibold mb-3"></div>
						<div className="flex justify-center items-center">
							<h1>Last Month</h1>
						</div>
						{sideData.map((activity:any, index) => (
							<div
								key={index}
								className={`activity-item mb-2 p-2 rounded-md cursor-pointer flex items-start justify-between hover:bg-[#d3f3e5] `}
							>
								<div className="flex items-start gap-2">
									<div>
										<div className="relative ">
											<div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
											{index !== sideData.length - 1 && (
												<div className="absolute w-px bg-white top-4 bottom-0 left-1.5"></div>
											)}
										</div>
									</div>
									<div>
										<p className="text-sm font-bold text-gray-700">
											{activity.type}
										</p>
										<p className="text-sm text-gray-500">
											{activity.description}
										</p>
									</div>
								</div>
								<div className="text-xs text-gray-400">
									{activity.date}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftContent;
