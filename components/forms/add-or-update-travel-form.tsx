"use client";

import { getFuelPrice } from "@/actions/fuels/get-fuel-price";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CarType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { DatePicker } from "../date-picker/date-picker";
import { CarTypeSelect } from "../selects/car-type-select";

const AddOrUpdateTravelForm = () => {
	const form = useForm<z.infer<typeof addOrUpdateTravelSchema>>({
		resolver: zodResolver(addOrUpdateTravelSchema),
		defaultValues: {
			carType: CarType.OIL,
		},
	});
	const [fuelPrice, setFuelPrice] = useState<number | null>(null);
	const { watch } = form;
	watch("carType");

	const getFuelPriceQuery = useQuery({
		queryKey: [queryKeys.fuelsPrice, form.getValues("carType")],
		queryFn: async () => {
			const response = await getFuelPrice({ fuel: form.getValues("carType") });

			if (response?.serverError) {
				toast.error(response.serverError);
			}
			if (response?.data?.value) {
				setFuelPrice(response.data.value);
			}

			return response?.data;
		},
	});

	function onSubmit(values: z.infer<typeof addOrUpdateTravelSchema>) {
		console.log(values);
	}
	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nom du trajet </FormLabel>
								<FormControl>
									<Input placeholder="Criterium fédéral #3" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-2 gap-4">
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
						<FormField
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
						/>
					</div>
					<FormField
						control={form.control}
						name="startingAddress"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse de départ</FormLabel>
								<FormControl>
									<Input placeholder="12 rue du général" {...field} />
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
									<Input placeholder="3 rue girault" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="carType"
							render={({ field }) => (
								<FormItem className="col-span-2 w-full">
									<FormLabel>Type de voiture</FormLabel>
									<FormControl>
										<CarTypeSelect
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

					<Button type="submit">Submit </Button>
				</form>
			</Form>
		</div>
	);
};

export default AddOrUpdateTravelForm;
