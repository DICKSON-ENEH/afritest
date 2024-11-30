import { useEffect, useState } from "react";
import Profile from "./Profile";
import Role from "./RoleComponents/Role";
import Teams from "./Teams";
import Notification from "./Notification";
import ActivityLog from "./ActivityLog";

interface ContentSection {
	title: string;
	content: JSX.Element;
}

const contentSections: ContentSection[] = [
	{
		title: "Profile",
		content: (
			<div>
				<Profile />
			</div>
		),
	},
	{
		title: "Role",
		content: (
			<div>
				<Role />
			</div>
		),
	},
	{
		title: "Teams",
		content: (
			<div>
				<Teams />
			</div>
		),
	},
	{
		title: "Notification",
		content: (
			<div>
				<Notification />
			</div>
		),
	},
	{
		title: "Activity Log",
		content: (
			<div>
				<ActivityLog />
			</div>
		),
	},
];

const SettingsComponentsSwitcher = () => {
	const [activeSection, setActiveSection] = useState<string>(
		contentSections[0].title
	);
	const [fadeIn, setFadeIn] = useState<boolean>(false);

	const handleButtonClick = (title: string) => {
		setFadeIn(false); // Start fading out
		setTimeout(() => {
			setActiveSection(title);
			setFadeIn(true); // Start fading in
		}, 200); // Match this duration to the CSS transition duration
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

export default SettingsComponentsSwitcher;
