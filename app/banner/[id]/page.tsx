import React from "react";
import BannerHeader from "../../../components/static/BannerHeader";
import BreadCrumbs from "../../../components/BannerComponents/BreadCrumbs";
import BannerDetails from "../../../components/BannerComponents/BannerDetails";
import Image from "next/image";
import img from "../../../public/assets/afrilogo.png";

const page = () => {
	return (
		<div>
			<BannerHeader />
			<BreadCrumbs />
			<div className="w-full grid grid-cols-11 gap-4 mt-5">
				<div className="col-span-11 md:col-span-7">
					<BannerDetails />
				</div>

				<div className=" w-full col-span-11 md:col-span-4 border">
					<Image
						className="w-full object-contain mt-9"
						src={img}
						alt="img"
						height={1000}
						width={1000}
					/>
				</div>
			</div>
		</div>
	);
};

export default page;
