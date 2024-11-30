import React from "react";

const RightContent = () => {
	return (
		<div className=" p-4 ml-5">
			<div className="activity-details border p-4 rounded-md ">
				<h2 className="text-lg font-bold mb-4">
					About this activity
				</h2>
				<div className="border-t border w-full my-1 font-semibold mb-3"></div>
				<div className="flex justify-between items-center">
					<div className="detail-item mb-4">
						<p className="text-sm font-bold">Initiator</p>
						<p className="text-sm text-gray-700">Moses Jacob</p>
					</div>
					<div className="detail-item mb-4">
						<p className="text-sm font-bold">Email Address</p>
						<p className="text-sm text-gray-700">
							mosesjacob@life.com
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="detail-item mb-4">
						<p className="text-sm font-bold">Role</p>
						<p className="text-sm text-gray-700">Customer Service</p>
					</div>
					<div className="detail-item mb-4">
						<p className="text-sm font-bold">Date</p>
						<p className="text-sm text-gray-700">
							22 Oct, 2023 10:54PM
						</p>
					</div>
				</div>
				<div className="border-t border w-full my-1 font-semibold mb-3"></div>
				<div className="detail-item mb-4">
					<p className="text-sm font-bold">IP Address</p>
					<p className="text-sm text-gray-700">123.456.789.097</p>
				</div>
			</div>
		</div>
	);
};

export default RightContent;
