import { Logo } from "@/components/logo";
import { Ellipsis } from "lucide-react";
import CustomSeparator from "./custom-separator";

const Navbar = () => {
	return (
		<>
			<div className="flex w-full items-center justify-between px-4">
				<Logo className="text-black" />
				<Ellipsis className="text-muted-foreground" />
			</div>
			<CustomSeparator />
		</>
	);
};

export default Navbar;
