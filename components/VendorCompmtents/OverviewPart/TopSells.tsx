import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import pic from "../../..//public/assets/burger.png";
import pic1 from "../../..//public/assets/bag.png";
import pic2 from "../../../public/assets/dog.png";
// import pic2 from "@/public/assets/dog.png";
import Image, { StaticImageData } from "next/image";

interface Product {
	imgSrc: string | StaticImageData;
	name: string;
	orders: string;
	price: string;
}

const TopSells: React.FC = () => {
	const products: Product[] = [
		{
			imgSrc: pic,
			name: "Chicken burger",
			orders: "20 orders",
			price: "₦550",
		},
		{
			imgSrc: "/assets/canSoda.png",
			name: "Soda",
			orders: "15 orders",
			price: "₦150",
		},
		{
			imgSrc: pic1,
			name: "Bag",
			orders: "15 orders",
			price: "₦150",
		},
		{
			imgSrc: pic2,
			name: "Dog",
			orders: "15 orders",
			price: "₦150",
		},
		{
			imgSrc: pic,
			name: "Beef burger",
			orders: "15 orders",
			price: "₦150",
		},
	];

	const stores = [
		{
			storeName: "Borne Foodies",
			orders: "843,750",
			cashback: "₦38,844",
		},
		{
			storeName: "Borne Foodies",
			orders: "843,750",
			cashback: "₦38,844",
		},
		{
			storeName: "Borne Foodies",
			orders: "843,750",
			cashback: "₦38,844",
		},
		{
			storeName: "Borne Foodies",
			orders: "843,750",
			cashback: "₦38,844",
		},
		{
			storeName: "Borne Foodies",
			orders: "843,750",
			cashback: "₦38,844",
		},
	];

	return (
		<div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Top Selling Products */}
			<div className="border rounded-xl p-5 shadow-sm bg-white">
				<h2 className="font-semibold text-base text-gray-800 mb-3 pl-4">
					Top 5 Selling Products
				</h2>
				<table className="w-full text-left">
					<thead className="bg-gray-50">
						<tr>
							<th className="text-gray-500 text-sm py-3 px-4">
								Products
							</th>
							<th className="text-gray-500 text-sm py-3 px-4 text-right">
								Price
							</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, index) => (
							<tr
								key={index}
								className="border-t last:border-b"
							>
								<td className="py-3 px-4 flex items-center space-x-3">
									<div className="bg-[#fbfbfb] rounded-lg">
										<Image
											src={product.imgSrc}
											alt={product.name}
											width={40}
											height={40}
											className="rounded-full"
										/>
									</div>
									<div>
										<div className="text-gray-800 font-medium">
											{product.name}
										</div>
										<div className="text-gray-400 text-sm">
											{product.orders}
										</div>
									</div>
								</td>
								<td className="py-3 px-4 text-right text-gray-800 font-medium">
									{product.price}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Top Selling Stores */}
			<div className="border rounded-xl p-5 shadow-sm bg-white">
				<h2 className="font-semibold text-base text-gray-800 mb-3 pl-4">
					Top 5 Selling Stores
				</h2>
				<table className="w-full text-left">
					<thead className="bg-gray-50 w-full">
						<tr>
							<th className="text-gray-500 text-sm py-4 px-5">
								Store
							</th>
							<th className="text-gray-500 text-sm py-4 px-5 text-right">
								Orders
							</th>
							<th className="text-gray-500 text-sm py-4 px-5 text-right">
								Cashback
							</th>
							<th className="text-gray-500 text-sm py-4 px-5 text-right"></th>{" "}
							{/* For action icons */}
						</tr>
					</thead>
					<tbody>
						{stores.map((store, index) => (
							<tr
								key={index}
								className="border-t last:border-b "
							>
								<td className="py-4 px-5 text-gray-800 font-medium">
									{store.storeName}
								</td>
								<td className="py-4 px-4 text-right text-gray-800 font-medium">
									{store.orders}
								</td>
								<td className="py-4 px-4 text-right text-gray-800 font-medium">
									{store.cashback}
								</td>
								<td className="py-4 px-4 flex items-center justify-end text-gray-800 font-medium">
									<HiOutlineDotsHorizontal className="ml-2 text-gray-500" />
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TopSells;
