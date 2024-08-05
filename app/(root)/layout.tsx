import ReactQueryProvider from "@/lib/react-query-provider";
import type { PropsWithChildren } from "react";
import Navbar from "./components/navbar";

const RootLayout = (props: PropsWithChildren) => {
	return (
		<div className=" pt-5">
			<ReactQueryProvider>
				<>
					<Navbar /> {props.children}
				</>
			</ReactQueryProvider>
		</div>
	);
};

export default RootLayout;
