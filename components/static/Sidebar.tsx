"use client";
import Link from "next/link";
import { IMAGES } from "../../app/utils/assets";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { iSideData } from "../../utils/types";
import { sideData } from "../../utils/data";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store/Store";

const Sidebar = () => {
	const { isLoggedIn } = useSelector(
		(state: RootState) => state.user
	);

	const router = usePathname();

	return isLoggedIn ? (
		<div className="w-[220px] hidden md:block bg-[#f9fafc] fixed left-0 h-full border-r shadow-lg text-gray-500 font-semibold">
			<div className="w-full flex pt-8 px-4">
				<Image
					src={IMAGES.logo}
					height={100}
					width={100}
					alt="logo"
				/>
			</div>
			<div className="mt-10">
				<ul className="space-y-2">
					{sideData.map((el: iSideData, i: number) => (
						<Link
							key={i}
							href={`/${
								el?.route! ? el.route! : el.name?.toLowerCase()!
							}`}
						>
							{" "}
							<li
								className={`py-2 px-4 w-full transition-all duration-300 flex items-center gap-3 capitalize cursor-pointer mb-2 ${
									router.replace("/", "") ===
										el.name?.toLowerCase() ||
									(router === "/" && el.route === "/")
										? "text-[#1da96d] border-l-4 bg-gradient-to-r   from-[#eaf3f1_0%] via-[rgba(255,255,255,1)_7%] to-[rgba(255,255,255,1)_100%] border-[#1da96d]"
										: "hover:text-[#1da96d] hover:border-l-4 hover:bg-gradient-to-r   from-[#eaf3f1_0%] via-[rgba(255,255,255,1)_7%] to-[rgba(255,255,255,1)_100%] hover:border-[#1da96d]"
								}`}
							>
								<div>{el.icon}</div>
								{el.name}
							</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	) : null;
};

export default Sidebar;
