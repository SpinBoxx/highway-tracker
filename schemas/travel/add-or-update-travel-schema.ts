import { constants } from "@/constants/constants";
import { CarFuel, Competition } from "@prisma/client";
import { z } from "zod";

export const addOrUpdateTravelSchema = z.object({
	id: z.string().optional(),
	name: z.string({
		required_error: "Requis",
	}),
	// Criterium, championship,etc.
	competition: z.nativeEnum(Competition),
	startDate: z.date({
		required_error: "Requis",
	}),
	endDate: z.date().optional(),
	isReturnTrip: z.boolean().default(false),
	startingAddress: z
		.string({
			required_error: "Requis",
		})
		.regex(
			constants.frenchAddressRegex,
			"Veuillez respecter le format: <rue> <code postal> <ville>",
		),
	destinationAddress: z
		.string({
			required_error: "Requis",
		})
		.regex(
			constants.frenchAddressRegex,
			"Veuillez respecter le format: <rue> <code postal> <ville>",
		),
	tollPrice: z.coerce.number({
		message: "Entrez le total pour le(s) péage(s).",
	}),
	// .refine((val) => {
	// 	console.log({ val });

	// 	return val === 0 ? 0 : val;
	// }),
	carFuel: z.nativeEnum(CarFuel),
	tollTickets: z.array(
		z.object({
			id: z.number().optional(),
			image: z.string(),
		}),
	),
});
