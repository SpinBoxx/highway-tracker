"use server";

import { ActionError } from "@/lib/create-safe-action";
import { createAuthAction } from "@/lib/create-safe-auth-action";
import { db } from "@/lib/prisma";
import { addOrUpdateTravelSchema } from "@/schemas/travel/add-or-update-travel-schema";
import type { Travel } from "@prisma/client";
import { getFuelPrice } from "../fuels/get-fuel-price";
import { getDistanceBetweenTwoAddress } from "../geo/get-distance-between-two-address";

export const addOrUpdateTravelAction = createAuthAction
	.schema(addOrUpdateTravelSchema)
	.action(async ({ parsedInput, ctx: { user } }) => {
		let {
			isReturnTrip,
			startingAddress,
			destinationAddress,
			carFuel,
			tollPrice,
		} = parsedInput;

		const distance = await getDistanceBetweenTwoAddress({
			destination: destinationAddress,
			origin: startingAddress,
			isReturnTrip,
		});

		if (!distance?.data) {
			throw new ActionError(
				"Impossible de calculer la distance entre les 2 adresses !",
			);
		}

		const fuelPrice = await getFuelPrice({
			fuel: carFuel,
		});

		if (fuelPrice?.serverError) {
			throw new ActionError("Impossible de récuperer le prix du carburant !");
		}

		if (isReturnTrip) {
			tollPrice = tollPrice * 2;
		}

		// biome-ignore lint/style/useConst: <explanation>
		let travel: Travel;
		console.log("FEFEf");

		const { id, tollTickets, ...body } = parsedInput;
		travel = await db.travel.create({
			data: {
				...body,
				userId: user.id,
				distance: distance.data.distanceText,
			},
		});

		console.log({ travel });

		return travel;
	});
