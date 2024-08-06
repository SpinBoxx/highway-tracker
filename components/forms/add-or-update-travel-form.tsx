"use client";

import { getFuelPrice } from "@/actions/fuels/get-fuel-price";
import { getDistanceBetweenTwoAddress } from "@/actions/geo/get-distance-between-two-address";
import { addOrUpdateTravelAction } from "@/actions/travel/add-or-update-travel";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/constants/query-key";
import { addOrUpdateTravelSchema } from "@/schemas/travel/add-or-update-travel-schema";
import { isValidFrenchAddress } from "@/services/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CarFuel, Competition } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Calculator, Info, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { DatePicker } from "../date-picker/date-picker";
import LoaderDotSpinner from "../loaders/loader-dot-spinner";
import { CarFuelSelect } from "../selects/car-fuel-select";
import { CompetitionSelect } from "../selects/competition-select";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";

const AddOrUpdateTravelForm = () => {
	const form = useForm<z.infer<typeof addOrUpdateTravelSchema>>({
		resolver: zodResolver(addOrUpdateTravelSchema),
		defaultValues: {
			carFuel: CarFuel.OIL,
			tollTickets: [],
			competition: Competition.CRITERIUM,
		},
	});
	const [fuelPrice, setFuelPrice] = useState<number | null>(null);
	const [travelDistance, setTravelDistance] = useState<number | null>(null);
	const { watch } = form;
	watch(["carFuel", "destinationAddress", "startingAddress", "isReturnTrip"]);

	const getFuelPriceQuery = useQuery({
		queryKey: [queryKeys.fuelsPrice, form.getValues("carFuel")],
		queryFn: async () => {
			const response = await getFuelPrice({ fuel: form.getValues("carFuel") });

			if (response?.serverError) {
				toast.error(response.serverError);
			}
			if (response?.data?.value) {
				setFuelPrice(response.data.value);
			}

			return response?.data;
		},
	});

	const getDistanceQuery = useQuery({
		queryKey: [
			form.getValues("startingAddress"),
			form.getValues("destinationAddress"),
		],
		queryFn: async () => {
			const response = await getDistanceBetweenTwoAddress({
				destination: form.getValues("destinationAddress"),
				origin: form.getValues("startingAddress"),
				isReturnTrip: form.getValues("isReturnTrip"),
			});

			if (response?.serverError) {
				toast.error(response.serverError);
			}
			if (response?.data?.distanceValue) {
				setTravelDistance(response.data.distanceValue);
			}
			return response?.data;
		},
		enabled: false,
	});

	const isBothAddressValid =
		(form.getValues("destinationAddress") ||
			form.getValues("startingAddress")) &&
		isValidFrenchAddress(form.getValues("destinationAddress")) &&
		isValidFrenchAddress(form.getValues("startingAddress"));

	const { execute } = useAction(addOrUpdateTravelAction, {
		onSuccess: (response) => {
			if (response.data) {
				toast.success("Le travel a bien été ajouté !");
			}
		},
	});

	function onSubmit(values: z.infer<typeof addOrUpdateTravelSchema>) {
		console.log({ values });

		execute(values);
	}
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-5 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="col-span-3">
									<FormLabel>Nom du trajet </FormLabel>
									<FormControl>
										<Input placeholder="Criterium fédéral #3" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="competition"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Compétition</FormLabel>
									<FormControl>
										<CompetitionSelect
											onValueChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<FormField
							control={form.control}
							name="startDate"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Date de départ</FormLabel>
									<FormControl>
										<DatePicker date={field.value} setDate={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name="endDate"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Date retour</FormLabel>
									<FormControl>
										<DatePicker date={field.value} setDate={field.onChange} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
					</div>
					<Card>
						<CardContent className="flex gap-2 p-3 text-orange-600 text-sm">
							<Info className="flex-none" /> Veuillez respecter le format
							suivant pour les adresses : {"<rue> <code postal> <ville>"}
						</CardContent>
					</Card>
					<FormField
						control={form.control}
						name="startingAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse de départ</FormLabel>
								<FormControl>
									<Input
										placeholder="9 Rue de Chantepie 44230 Saint-Sébastien-sur-Loire"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="destinationAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse de destination</FormLabel>
								<FormControl>
									<Input
										placeholder="37 Rue nationale 49740 La Romagne"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="isReturnTrip"
						render={({ field }) => (
							<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
								<div className="space-y-0.5">
									<FormLabel className="text-base">
										Calculer le trajet aller-retour ?
									</FormLabel>
									<FormDescription>
										{form.getValues("isReturnTrip")
											? "Je veux calculer la distance pour l'aller et le retour"
											: "Je veux calculer la distance pour l'aller"}
									</FormDescription>
								</div>
								<FormControl>
									<Switch
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					{/* <div className="grid grid-cols-3 gap-8">
						<Button
							disabled={!isBothAddressValid}
							type="button"
							className="col-span-2"
							onClick={async () => {
								await getDistanceQuery.refetch();
							}}
						>
							{getDistanceQuery.isFetching ? (
								<LoaderDotSpinner text="Calcul en cours..." />
							) : (
								<>
									<Calculator className="mr-2 size-5 flex-none" /> Calculer la
									distance
								</>
							)}
						</Button>
						<Input
							disabled
							value={
								getDistanceQuery.data
									? `${getDistanceQuery.data.distanceText}`
									: "En attente de calcul"
							}
							className="self-end bg-gray-200"
						/>
					</div> */}

					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="carFuel"
							render={({ field }) => (
								<FormItem className="col-span-2 w-full">
									<FormLabel>Type de voiture</FormLabel>
									<FormControl>
										<CarFuelSelect
											onValueChange={field.onChange}
											value={field.value}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Input
							disabled
							value={
								getFuelPriceQuery.data
									? `${getFuelPriceQuery.data.value} €/L`
									: "Chargement"
							}
							className="self-end bg-gray-200"
						/>
					</div>
					<FormField
						control={form.control}
						name="tollPrice"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Prix total du/des péage(s)</FormLabel>
								<FormControl>
									<Input placeholder="0" type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full">
						<Plus className="mr-2" />
						Créer le trajet
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default AddOrUpdateTravelForm;
