import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, Crown, type LucideIcon } from "lucide-react";
import type { HTMLAttributes } from "react";

interface Props {
	actionTitle: string;
	actionDescription: string;
	onClick: () => void;
	Icon: LucideIcon;
}

const CardAction = ({
	actionDescription,
	actionTitle,
	Icon,
	onClick,
	className,
	...props
}: Props & HTMLAttributes<HTMLDivElement>) => {
	return (
		<div className={cn("flex items-center gap-3", className)}>
			<Button size="icon">
				<Icon className="size-5" />
			</Button>
			<div className="flex flex-col">
				<p className="font-medium">{actionTitle}</p>
				<p className="text-muted-foreground text-sm">{actionDescription}</p>
			</div>
			<ChevronRight className="ml-auto size-7 text-muted-foreground" />
		</div>
	);
};

export default CardAction;
