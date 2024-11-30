import React, { useEffect, useState } from "react";
import AllContent from "./AllAuditTrailContent";
import AuditLogsContent from "./AuditLogsContent";

interface AuditContentSection {
	title: string;
	content: JSX.Element;
}

const auditContentSection: AuditContentSection[] = [
	{
		title: "Audit Trail",
		content: (
			<div>
				<AllContent />
			</div>
		),
	},

	{
		title: "Audit Logs",
		content: (
			<div>
				<AuditLogsContent />
			</div>
		),
	},
];

const AuditContentSwitcher = () => {
	const [activeSection, setActiveSection] = useState<string>(
		auditContentSection[0].title
	);

	const [fadeIn, setFadeIn] = useState<boolean>(false);

	const handleButtonClick = (title: string) => {
		setFadeIn(false); 
		const timeout = setTimeout(() => {
			setActiveSection(title);
			setFadeIn(true);
			clearTimeout(timeout);
		}, 200);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFadeIn(true);
			clearTimeout(timeout);
		}, 200);
	}, []);

	const activeContent = auditContentSection.find(
		(section) => section.title === activeSection
	);

	return (
		<div className="flex flex-col">
			<div className="flex mb-4">
				{auditContentSection.map((el) => (
					<button
						key={el.title}
						className={`px-4 py-2 mr-2 rounded-md text-gray-700 hover:bg-[#f0fcf6] hover:text-green-500 font-semibold ${
							activeSection == el.title
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

export default AuditContentSwitcher;
