import React, { FC, ReactNode } from "react";

export interface iCardTwo {
	icon?: ReactNode;
	lgTxt?: string;
	smTxt?: string;
	btnColour?: boolean;
	iconBgColor?: string;
}

const CardTwo: FC<iCardTwo> = ({
	icon,
	btnColour,
	lgTxt,
	smTxt,
	iconBgColor,
}) => {
	return (
		<div className="flex p-5 rounded-lg gap-5 border ">
			<div
				className="w-[40px] h-[40px] rounded-full  bg-gray-200 flex items-center justify-center"
				style={{ backgroundColor: iconBgColor }}
			>
				{icon}
			</div>
			<div className="space-y-2">
				<h1 className="font-bold text-[20px]">{lgTxt}</h1>
				<p className="text-[9px] font-extrabold">{smTxt}</p>
			</div>
		</div>
	);
};

export default CardTwo;
