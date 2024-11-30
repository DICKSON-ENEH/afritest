import React from "react";

const NotificationSettings = () => {
	return (
		<div className="p-8">
			<h2 className="text-2xl font-semibold mb-4">
				Notification settings
			</h2>
			<p className="text-gray-600 mb-6">
				Set who receives notifications and what notifications are sent
			</p>

			<div className="mb-6">
				<div className="flex flex-col md:flex-row justify-between items-start mb-4">
					<div className="md:mr-32">
						<h3 className="text-xl font-semibold">Admin</h3>
						<p className="text-gray-500">
							Manage how Faramove Admin communicates <br /> and what
							they receive from partners
						</p>
					</div>
					<div className="mt-4 md:mt-0">
						{[
							{
								title: "User Message",
								description:
									"Admin is notified when there is a message from user",
							},
							{
								title: "Status Update",
								description:
									"When a user has verified his or her account",
							},
							{
								title: "User Created",
								description:
									"When a user is created from the app or admin",
							},
							{
								title: "Subscription Created",
								description: "When a subscription is created",
							},
							{
								title: "Subscription Changed",
								description:
									"When a subscription for a user has been changed",
							},
						].map((item, index) => (
							<div
								className="flex items-center mb-5"
								key={index}
							>
								<input
									type="checkbox"
									className="mr-2 scale-125 accent-green-600 mb-5"
									checked
								/>
								<div>
									<h4 className="font-medium">{item.title}</h4>
									<p className="text-gray-500">{item.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<hr className="mb-6" />

			<div className="flex flex-col md:flex-row justify-between items-start">
				<div className="md:mr-32">
					<h3 className="text-xl font-semibold">Customer Support</h3>
					<p className="text-gray-500">
						Manage how AfriRewards Customer Support communicates{" "}
						<br /> and what they receive from users
					</p>
				</div>
				<div className="mt-4 md:mt-0 mr-36">
					{[
						{
							title: "Status Update",
							description: "When a subscription is updated",
						},
						{
							title: "Subscription Created",
							description: "When a subscription is created",
						},
					].map((item, index) => (
						<div
							className="flex items-center mb-5"
							key={index}
						>
							<input
								type="checkbox"
								className="mr-2 scale-125 accent-green-600 mb-5"
								checked
							/>
							<div>
								<h4 className="font-medium">{item.title}</h4>
								<p className="text-gray-500">{item.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NotificationSettings;
