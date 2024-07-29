import { Crown } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const TravelCard = () => {
	return (
		<Card className="w-56 bg-gradient-to-b from-blue-300/80 via-blue-100x to-white">
			<CardHeader className="pb-3 ">
				<Button size="icon" className="size-8">
					<Crown className="size-5" />
				</Button>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="flex gap-2">
					<p className="font-medium">Criterium</p>{" "}
					<span className="text-primary">#4</span>
				</div>
				<div>
					<span className="text-sm">12/02/2024</span>
				</div>
			</CardContent>
		</Card>
	);
};

export default TravelCard;
