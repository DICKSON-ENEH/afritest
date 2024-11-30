'use client';

import React, { useState } from "react";
import DraftContent from "./DraftContent";
import Content from "./Content";
import ScheduledContent from "./ScheduledContent";
import History from "./History";

interface ContentSection {
    title: string;
    content: JSX.Element;
}

const ContentSwitcher: React.FC = () => {
    const contentSections: ContentSection[] = [
        {
            title: "Content",
            content: (
                <div>
                    <Content />
                </div>
            ),
        },
        {
            title: "Draft",
            content: (
                <div>
                    <DraftContent />
                </div>
            ),
        },
        {
            title: "Scheduled Content",
            content: (
                <div>
                    <ScheduledContent />
                </div>
            ),
        },
        {
            title: "History",
            content: (
                <div>
                    <History />
                </div>
            ),
        },
    ];

    const [activeSection, setActiveSection] = useState<string>(
        contentSections.length > 0 ? contentSections[0].title : ''
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

export default ContentSwitcher;