"use server";

import { ActionError } from "@/lib/create-safe-action";
import { createAuthAction } from "@/lib/create-safe-auth-action";
import { getDistanceBetweenTwoAddressSchema } from "@/schemas/geo/get-distance-between-two-address-schema";

interface GoogleMapsDistanceMatrixResponse {
	destination_addresses: string[];
	origin_addresses: string[];
	rows: Row[];
	status: string;
}

interface Row {
	elements: Element[];
}

interface Element {
	distance: Distance;
	duration: Duration;
	origin: string;
	destination: string;
	status: string;
}

interface Distance {
	text: string;
	value: number;
}

interface Duration {
	text: string;
	value: number;
}

export const getDistanceBetweenTwoAddress = createAuthAction
	.schema(getDistanceBetweenTwoAddressSchema)
	.action(
		async ({
			parsedInput: { destination, origin, isReturnTrip },
			ctx: { user },
		}) => {
			const { MATRIX_GEO_KEY } = process.env;

			const response = await fetch(
				`https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${MATRIX_GEO_KEY}`,
			);

			if (!response.ok) {
				throw new ActionError(
					"Impossible de récuperer la distance entre les 2 adresses.",
				);
			}

			const data: GoogleMapsDistanceMatrixResponse = await response.json();
			const calculationStatus = data.rows.at(0)?.elements.at(0)?.status;

			if (calculationStatus?.toLowerCase() === "zero_results") {
				throw new ActionError(
					"Une erreur est survenue. Veuillez vérifier la validité de votre adresse de départ et d'arrivé !",
				);
			}

			let distanceText = data.rows.at(0)?.elements.at(0)?.distance.text;
			let distanceValue = data.rows.at(0)?.elements.at(0)?.distance.value;
			const duration = data.rows.at(0)?.elements.at(0)?.duration.text;

			if (!distanceText || !distanceValue || !duration) {
				throw new ActionError(
					"Impossible de récuperer la distance entre les 2 adresses.",
				);
			}

			// If we need to calculate the return trip, we may multiply the current distance by 2
			if (isReturnTrip) {
				const distance: string[] = distanceText.split(" ");
				distance[0] = (Number(distance[0]) * 2).toString();
				distanceText = distance.join(" ");
				distanceValue = distanceValue * 2;
			}

			return {
				distanceText,
				distanceValue,
				duration,
			};
		},
	);
