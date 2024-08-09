import { cn } from "@/lib/utils";
import { getDateInFrench } from "@/services/date";
import type { Competition, Travel } from "@prisma/client";
import { Calendar, Crown, Navigation, Trophy, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Props {
	travel: Travel;
}

export const TravelCard = ({ travel }: Props) => {
	return (
		<Card
			className={cn(
				"shadow-lg",
				competitionColors({ competition: travel.competition }).bg,
			)}
		>
			<CardHeader className="w-52 pb-3">
				<CompetitionLogo competition={travel.competition} />
			</CardHeader>
			<CardContent className="pt-0">
				<div className="line-clamp-2 flex h-12 gap-2">
					<p className="font-medium">{travel.name}</p>
				</div>
				<div className="mt-auto flex gap-3">
					<span className="center text-muted-foreground text-xs">
						<Calendar className="mr-2 size-4 flex-none" />{" "}
						{getDateInFrench(travel.startDate)}
					</span>
					<span className="center text-muted-foreground text-xs">
						<Navigation className="mr-2 size-4 flex-none" /> {travel.distance}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

interface CompetitionLogoProps {
	competition: Competition;
}
const CompetitionLogo = ({ competition }: CompetitionLogoProps) => {
	switch (competition) {
		case "CRITERIUM":
			return (
				<Button
					size="icon"
					className={cn("size-8", competitionColors({ competition }).color)}
				>
					<Crown className="size-5" />
				</Button>
			);
		case "CHAMPIONSHIP":
			return (
				<Button
					size="icon"
					className={cn("size-8", competitionColors({ competition }).color)}
				>
					<Users className="size-5" />
				</Button>
			);
		case "TOURNAMENT":
			return (
				<Button
					size="icon"
					className={cn("size-8", competitionColors({ competition }).color)}
				>
					<Trophy className="size-5" />
				</Button>
			);
	}
};

const competitionColors = ({ competition }: CompetitionLogoProps) => {
	switch (competition) {
		case "CRITERIUM":
			return {
				bg: "bg-gradient-to-br from-purple-300/80 via-purple-100/50 to-white",
				color: "bg-purple-500",
			};
		case "CHAMPIONSHIP":
			return {
				bg: "bg-gradient-to-br from-blue-300/80 via-blue-100/50 to-white",
				color: "bg-primary",
			};
		case "TOURNAMENT":
			return {
				bg: "bg-gradient-to-br from-green-300/80 via-green-100/50 to-white",
				color: "bg-green-500",
			};
	}
};

export const TravelCardSkeleton = () => {
	return (
		<div className="h-[166px] w-52 animate-pulse rounded-md bg-gray-200 shadow-lg" />
	);
};
