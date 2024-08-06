import { cn } from "@/lib/utils";
import { getDateInFrench } from "@/services/date";
import type { Competition, Travel } from "@prisma/client";
import { Crown, Trophy, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Props {
	travel: Travel;
}

const TravelCard = ({ travel }: Props) => {
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
				<div className="mt-auto">
					<span className="text-sm">{getDateInFrench(travel.startDate)}</span>
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
				bg: "bg-gradient-to-b from-purple-300/80 via-purple-100 to-white",
				color: "bg-purple-500",
			};
		case "CHAMPIONSHIP":
			return {
				bg: "bg-gradient-to-b from-blue-300/80 via-blue-100 to-white",
				color: "bg-primary",
			};
		case "TOURNAMENT":
			return {
				bg: "bg-gradient-to-b from-green-300/30 via-green-100/40 to-white",
				color: "bg-green-500",
			};
	}
};

export default TravelCard;
