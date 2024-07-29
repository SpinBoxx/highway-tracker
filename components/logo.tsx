import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactHTMLElement } from "react";

export const Logo = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("flex items-center gap-2 text-blue-500 text-xl", className)}
		>
			<span className="text-3xl">◪</span>
			<p className="font-medium">Heca</p>
		</div>
	);
};
