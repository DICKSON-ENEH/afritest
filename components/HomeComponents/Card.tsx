import { FC, ReactNode } from "react";

export interface iCard {
	icon?: ReactNode;
	lgTxt?: string;
	smTxt?: string;
	btnColour?: string;
}

const Card: FC<iCard> = ({ icon, btnColour, lgTxt, smTxt }) => {
	return (
		<div
			className={`relative flex p-5 rounded-lg gap-5 shadow-md ${btnColour} text-white`}
		>
			<div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center">
				{icon}
			</div>
			<div className="space-y-1">
				<h1 className="font-semibold text-[25px]">{lgTxt}</h1>
				<p className="text-[12px]">{smTxt}</p>
			</div>
			<div className="absolute bottom-1 right-1 w-[55px] h-[55px] rounded-full bg-gray-50 bg-opacity-50 flex items-center justify-center"></div>
		</div>
	);
};

export default Card;
