import React, { useState } from "react";

const Switch: React.FC = () => {
	const [isOn, setIsOn] = useState(false);

	const toggleSwitch = () => {
		setIsOn(!isOn);
	};

	return (
		<div
			className={`w-[50px] h-[25px] flex items-center rounded-full p-1 cursor-pointer ${
				isOn ? "bg-green-500" : "bg-red-500"
			}`}
			onClick={toggleSwitch}
		>
			<div
				className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform duration-300 ease-in-out ${
					isOn ? "translate-x-[24px]" : ""
				}`}
			></div>
		</div>
	);
};

export default Switch;
