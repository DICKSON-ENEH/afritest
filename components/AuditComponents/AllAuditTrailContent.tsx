import React from "react";
import RightContent from "./RightContent";
import LeftContent from "./LeftContent";

const AllContent = () => {
	return (
		<div className="grid grid-cols-11">
			<div className="col-span-11 xl:col-span-7">
				<LeftContent />
			</div>
			<div className="col-span-11 xl:col-span-4">
				<RightContent />
			</div>
		</div>
	);
};

export default AllContent;
