import React, { FC, useState } from "react";

interface Role {
	name: string;
	permissions: {
		[category: string]: { [permission: string]: boolean };
	};
}

interface iRoleSide {
	selectedRole: Role | null;
	showDetails?: boolean;
	closeDetails?: () => void;
}

const RoleSide: FC<iRoleSide> = ({
	selectedRole,
	showDetails,
	closeDetails,
}) => {
	const [state, setState] = useState<boolean>(false);

	const hide = () => {
		closeDetails!();

		const timeout = setTimeout(() => {
			setState(true);
		}, 1000);
	};

	return (
		<>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity  duration-300 ${
					showDetails && selectedRole
						? "opacity-100 visible"
						: "opacity-0 invisible"
				}`}
				onClick={hide}
			></div>
			<div
				className={`fixed top-0 right-0 w-[370px] min-h-screen bg-white z-50 transition-transform duration-1000 overflow-y-auto ${
					showDetails && selectedRole
						? "transform translate-x-0"
						: "transform translate-x-full"
				}`}
			>
				{selectedRole && (
					<div className="p-6">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold">
								{selectedRole.name}
							</h2>
							<button
								onClick={hide}
								className="text-gray-500"
							>
								&#10005;
							</button>
						</div>
						<div>
							{Object.keys(selectedRole.permissions).map(
								(category) => (
									<div
										key={category}
										className="mb-6"
									>
										<h3 className="text-xl font-semibold mb-2">
											{category}
										</h3>
										<ul>
											{Object.keys(
												selectedRole.permissions[category]
											).map((permission) => (
												<li
													key={permission}
													className="flex items-center mb-2"
												>
													<input
														type="checkbox"
														checked={
															selectedRole.permissions[category][
																permission
															]
														}
														readOnly
														className="mr-2"
													/>
													{permission}
												</li>
											))}
										</ul>
									</div>
								)
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default RoleSide;
