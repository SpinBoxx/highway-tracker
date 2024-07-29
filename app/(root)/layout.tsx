import type { PropsWithChildren } from "react";
import Navbar from "./components/navbar";

const RootLayout = (props: PropsWithChildren) => {
	return (
		<div className=" pt-5">
			<Navbar /> {props.children}
		</div>
	);
};

export default RootLayout;
