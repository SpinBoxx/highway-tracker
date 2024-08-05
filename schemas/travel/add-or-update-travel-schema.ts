import { CarType, TravelType } from "@prisma/client";
import { z } from "zod";

export const addOrUpdateTravelSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	// Criterium, championship,etc.
	type: z.nativeEnum(TravelType),
	startDate: z.date(),
	endDate: z.date(),
	startingAddress: z.string(),
	destinationAddress: z.string(),
	tollPrice: z.number(),
	carType: z.nativeEnum(CarType),
	tollTickets: z.array(
		z.object({
			id: z.number().optional(),
			image: z.string(),
		}),
	),
});
