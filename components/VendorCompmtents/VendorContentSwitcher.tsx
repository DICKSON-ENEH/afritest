import { useEffect, useState } from "react";

import OverviewMainScreen from "./OverviewPart/OverviewMainScreen";
import StoreMainScreen from "./Storepart/StoreMainScreen";

interface ContentSection {
	title: string;
	content: JSX.Element;
}

const contentSections: ContentSection[] = [
	{
		title: "Overview",
		content: (
			<div>
				<OverviewMainScreen />
			</div>
		),
	},
	{
		title: "Stores",
		content: (
			<div>
				<StoreMainScreen />
			</div>
		),
	},
	{
		title: "Catalog",
		content: (
			<div>
				<div>Draft Content goes here</div>,
			</div>
		),
	},
	{
		title: "Business Settings",
		content: (
			<div>
				<div>Draft Content goes here</div>,
			</div>
		),
	},
];

const VendorContentSwitcher = () => {
	const [activeSection, setActiveSection] = useState<string>(
		contentSections[0].title
	);
	const [fadeIn, setFadeIn] = useState<boolean>(false);

	const handleButtonClick = (title: string) => {
		setFadeIn(false);
		setTimeout(() => {
			setActiveSection(title);
			setFadeIn(true);
		}, 200);
	};

	const activeContent = contentSections.find(
		(section) => section.title === activeSection
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFadeIn(true);
			clearTimeout(timeout);
		}, 200);
	}, []);

	return (
		<div className="flex flex-col">
			<div className="flex mb-4">
				{contentSections.map((el) => (
					<button
						key={el.title}
						className={`px-4 py-2 mr-2 rounded-md text-gray-700 hover:bg-[#f0fcf6] hover:text-green-500 font-semibold ${
							activeSection === el.title
								? "bg-[#f0fcf6] text-green-500"
								: ""
						}`}
						onClick={() => handleButtonClick(el.title)}
					>
						{el.title}
					</button>
				))}
			</div>
			<div
				className={`flex-grow transition-opacity duration-200 ${
					fadeIn ? "opacity-100" : "opacity-0"
				}`}
			>
				{activeContent?.content}
			</div>
		</div>
	);
};

export default VendorContentSwitcher;
