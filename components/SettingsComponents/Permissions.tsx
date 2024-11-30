import React, { useRef } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface PermissionsProps {
	role: string;
	permissionsTitle: string;
	permissions: {
		category: string;
		items: string[];
	}[];
}

const Permissions: React.FC<PermissionsProps> = ({
	role,
	permissionsTitle,
	permissions,
}) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const scrollContent = (direction: "up" | "down") => {
		if (scrollContainerRef.current) {
			const scrollAmount = direction === "up" ? -50 : 50;
			scrollContainerRef.current.scrollBy({
				top: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="p-6 border rounded-lg bg-white ">
			<div className="mb-6 text-lg font-semibold">Role: {role}</div>
			<hr className="mb-6" />
			<div className="mb-6 text-lg font-semibold">
				{permissionsTitle}
			</div>
			<hr className="mb-6" />
			<div className="flex">
				<div
					ref={scrollContainerRef}
					className="overflow-y-auto max-h-48 pt-2 flex-grow pr-4"
				>
					{permissions.map((el, index) => (
						<div
							key={index}
							className="mb-4"
						>
							<h2 className="text-xl font-semibold mb-2">
								{el.category}
							</h2>
							{el.items.map((item, idx) => (
								<p
									key={idx}
									className="ml-4 text-gray-700"
								>
									{item}
								</p>
							))}
						</div>
					))}
				</div>
				<div className="flex flex-col justify-between ml-4">
					<button
						onClick={() => scrollContent("up")}
						className="text-gray-500 hover:text-gray-700 mb-2 p-2 rounded bg-gray-100 hover:bg-gray-200"
					>
						<IoIosArrowUp
							size={24}
							color="green"
						/>
					</button>
					<button
						onClick={() => scrollContent("down")}
						className="text-gray-500 hover:text-gray-700 p-2 rounded bg-gray-100 hover:bg-gray-200"
					>
						<IoIosArrowDown
							size={24}
							color="green"
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Permissions;
