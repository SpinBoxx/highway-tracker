import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const CustomSeparator = ({
	className,
	children,
	...props
}: HTMLAttributes<HTMLDivElement>) => {
	return children ? (
		<div
			className={cn(
				"my-3 w-full border-gray-400/70 border-y bg-gray-200 px-4 py-1.5 font-semibold",
				className,
			)}
		>
			{children}
		</div>
	) : (
		<div
			className={cn(
				"my-3 h-3 w-full border-gray-400/70 border-y bg-gray-200",
				className,
			)}
		/>
	);
};

export default CustomSeparator;
