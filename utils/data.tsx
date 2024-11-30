import { BiHome, BiPaperclip } from "react-icons/bi";
import { iSideData } from "./types";
import { MdGroup } from "react-icons/md";
import { BsImage, BsPersonCheck, BsShop } from "react-icons/bs";
import { CiCreditCard1, CiSettings } from "react-icons/ci";
import { LuPieChart } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";

export const sideData: iSideData[] = [
	{
		name: "dashboard",
		route: "/",
		icon: <BiHome size={20} />,
	},
	{
		icon: <MdGroup size={20} />,
		name: "users",
	},
	{
		icon: <BsShop size={20} />,
		name: "vendors",
	},
	{
		icon: <CiCreditCard1 size={20} />,
		name: "subscriptions",
	},
	{
		icon: <LuPieChart size={20} />,
		name: "analytics",
	},
	{
		icon: <LuPieChart size={20} />,
		name: "products",
	},
	{
		icon: <BsPersonCheck size={20} />,
		name: "account",
	},
	{
		icon: <BiPaperclip size={20} />,
		name: "CMS",
	},
	{
		icon: <CiSettings size={20} />,
		name: "settings",
	},
	{
		icon: <HiOutlineUserGroup size={20} />,
		name: "audit",
	},
	{
		icon: <BsImage size={20} />,
		name: "banner",
	},
];
