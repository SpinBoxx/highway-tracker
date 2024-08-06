import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactHTMLElement } from "react";

export const Logo = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("flex items-center gap-2 text-xl", className)}>
			<span className="text-3xl">◪</span>
			<p className="mt-1 font-semibold">Heca</p>
		</div>
	);
};
