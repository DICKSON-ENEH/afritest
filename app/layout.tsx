"use client";

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import "./globals.css";
import { Provider } from "react-redux";
// import { PersistGate } from 'redux-persist/integration/react';
import { RootState, persistor, store } from "../redux/Store/Store";
// import { MantineProvider } from '@mantine/core';
// import { Notifications } from '@mantine/notifications';
// import "@mantine/notifications/styles.css";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./globals.css";
// import Sidebar from "@/components/stjatic/Sidebar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/static/Sidebar";

const quick = Quicksand({ subsets: ["latin"] });

//@ts-node
// export const metadata: Metadata = {
// 	title: "Afri",
// 	description: "Revolutionizing shopping",
// };
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Provider store={store}>
			<ReduxWrapper>{children}</ReduxWrapper>
		</Provider>
	);
}

function ReduxWrapper({ children }: { children: React.ReactNode }) {
	const { isLoggedIn } = useSelector(
		(state: RootState) => state.user
	);

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined") {
			const currentPath = window.location.pathname;
			if (isLoggedIn && currentPath === "/login") {
				const previousPath = window.history.state?.prevPath || "/";
				router.push(previousPath);
			} else if (!isLoggedIn && currentPath !== "/login") {
				router.push("/login");
			}
		}
	}, [isLoggedIn, router]);

	return (
		<html lang="en">
			<body className={quick.className}>
			<ToastContainer
						position="top-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						theme="light"
					/>

				<div
					className={`${
						isLoggedIn
							? "flex bg-gray-100 min-h-screen justify-end"
							: ""
					}`}
				>
					{isLoggedIn && <Sidebar />}

					
					<div
						className={`${
							isLoggedIn
								? "md:w-[calc(100%-220px)] w-full min-h-screen p-6 bg-white"
								: ""
						}`}
					>
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
