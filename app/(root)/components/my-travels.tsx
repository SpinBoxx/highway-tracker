"use client";

import { getAllTravelsAction } from "@/actions/travel/get-all-travels";
import { TravelCard, TravelCardSkeleton } from "@/components/cards/travel-card";
import { queryKeys } from "@/constants/query-key";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
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
		<div className="pb-3">
			<div className="flex justify-between">
				<p className="highlight highlight-variant-1 highlight-primary highlight-spread-md mt-2 font-semibold text-white text-xl">
					Mes trajets
				</p>
				<span className="mt-3 flex h-fit items-center gap-1 self-center text-primary text-sm">
					Voir tous {travelsQuery.data && `(${travelsQuery.data.length})`}{" "}
					<ChevronRight className="size-4 flex-none" />
				</span>
			</div>

			<ScrollContainer className="flex gap-3 overflow-x-scroll py-4">
				{travelsQuery.data ? (
					travelsQuery.data.map((travel) => (
						<TravelCard key={travel.id} travel={travel} />
					))
				) : (
					<div className="flex gap-3">
						{[...Array(3)].map((val) => (
							<TravelCardSkeleton key={val} />
						))}
					</div>
				)}
			</ScrollContainer>
		</div>
	);
};

export default MyTravelsSection;
