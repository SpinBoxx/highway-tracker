import TravelCard from "@/components/cards/travel-card";

const MyTripsSection = () => {
	return (
		<div className="space-y-2.5 pb-3">
			<p className="font-semibold text-xl">Mes trajets</p>
			<div>
				<TravelCard />
			</div>
		</div>
	);
};

export default MyTripsSection;
