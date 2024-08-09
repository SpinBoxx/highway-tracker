"use client";

import { getAllTravelsAction } from "@/actions/travel/get-all-travels";
import { TravelCard, TravelCardSkeleton } from "@/components/cards/travel-card";
import { Button } from "@/components/ui/button";
import { queryKeys } from "@/constants/query-key";
import { routes } from "@/constants/routes";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight, CircleX } from "lucide-react";
import Link from "next/link";
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

			{travelsQuery.data?.length === 0 ? (
				<div className="mt-6 space-y-4 font-medium">
					<div className="flex gap-3">
						{/* <CircleX className="mt-1 size-9 flex-none text-red-500" /> */}
						<p className="text-balance text-2xl text-bold">
							Vous n'avez encore aucun trajet d'ajouté sur Heca {":("}
						</p>
					</div>
					<Button className="bg-secondary">
						<Link href={routes.addTravel}>
							Commencez à le créer maintenant !
						</Link>
					</Button>
				</div>
			) : (
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
			)}
		</div>
	);
};

export default MyTravelsSection;
