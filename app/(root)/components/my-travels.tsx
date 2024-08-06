"use client";

import { getAllTravelsAction } from "@/actions/travel/get-all-travels";
import TravelCard from "@/components/cards/travel-card";
import { queryKeys } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import ScrollContainer from "react-indiana-drag-scroll";

const MyTravelsSection = () => {
	const travelsQuery = useQuery({
		queryKey: [queryKeys.travels],
		queryFn: async () => {
			const travels = await getAllTravelsAction({});
			return travels?.data;
		},
	});

	return (
		<div className=" pb-3">
			<p className="mt-6 font-semibold text-xl">Mes trajets</p>
			<ScrollContainer className="flex gap-3 overflow-x-scroll py-4">
				{travelsQuery.data?.map((travel) => (
					<TravelCard key={travel.id} travel={travel} />
				))}
			</ScrollContainer>
		</div>
	);
};

export default MyTravelsSection;
