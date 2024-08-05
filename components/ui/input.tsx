"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [isShowPassword, setIsShowPassword] = React.useState(true);
		return type === "password" ? (
			<div className="relative h-fit">
				<input
					type={isShowPassword ? "text" : type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className,
					)}
					ref={ref}
					{...props}
				/>
				{type === "password" ? (
					!isShowPassword ? (
						<Eye
							onClick={() => setIsShowPassword(true)}
							className="absolute top-0 right-3 bottom-0 my-auto"
						/>
					) : (
						<EyeOff
							onClick={() => setIsShowPassword(false)}
							className="absolute top-0 right-3 bottom-0 my-auto"
						/>
					)
				) : null}
			</div>
		) : (
			<input
				type={isShowPassword ? "text" : type}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
