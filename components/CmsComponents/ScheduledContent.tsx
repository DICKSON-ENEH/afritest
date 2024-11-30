import { HiOutlineDotsVertical } from "react-icons/hi";

const draft = [
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
	{
		title: "Get Connected Faster",
		description: "Get your deliveries at the ...",
		author: "Moses Jacob",
		dateCreated: "1st July, 2023 02:54PM",
		ScheduledTime: "3rd July, 2023 08:54AM",
	},
];

const ScheduledContent = () => {
	return (
		<div className="mt-7">
			<div className="overflow-x-auto mt-4">
				<table className="min-w-full bg-white border">
					<thead>
						<tr className="w-full border-b text-[#494a53]">
							<th className="px-4 py-2 text-center">Title</th>
							<th className="px-4 py-2 text-center">Description</th>
							<th className="px-4 py-2 text-center">Author</th>
							<th className="px-4 py-2 text-center">Date Created</th>
							<th className="px-4 py-2 text-center">
								Scheduled Time
							</th>
						</tr>
					</thead>
					<tbody>
						{draft.map((draft, index) => (
							<tr
								className="border-b text-[#494a53] "
								key={index}
							>
								<td className="px-4 py-2 text-center">
									<div className="text-[15px] font-semibold text-green-500">
										{draft.title}
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[15px]">
											{draft.description}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[15px]">
											{draft.author}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center">
									<div className="flex items-center gap-2 justify-center">
										<div className="font-semibold text-[15px]">
											{draft.dateCreated}
										</div>
									</div>
								</td>
								<td className="px-4 py-2 text-center font-semibold text-[15px]">
									{draft.ScheduledTime}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ScheduledContent;
