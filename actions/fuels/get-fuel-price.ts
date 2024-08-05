"use server";

import { ActionError, createSafeAction } from "@/lib/create-safe-action";
import { getFuelPriceSchema } from "@/schemas/fuel/get-fuel-price-schema";
import type { CarType } from "@prisma/client";

type ApiResponse = {
	id: number;
	Brand: {
		id: number;
		name: string;
		short_name: string;
		nb_stations: number;
	};
	type: string;
	name: string;
	Address: {
		street_line: string;
		city_line: string;
	};
	Fuels: Array<{
		id: number;
		type: string;
		name: string;
		short_name: string;
		picto: string;
		Update: {
			value: string;
			text: string;
		};
		rupture: boolean;
		Price: {
			value: number;
			text: string;
		};
	}>;
	LastUpdate: {
		value: string;
		text: string;
	};
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const getFuelPrice = createSafeAction
	.schema(getFuelPriceSchema)
	.action(async ({ parsedInput: { fuel } }) => {
		const response = await fetch(
			"http://api.prix-carburants.2aaz.fr/station/44272001",
			{
				headers: {
					accept: "application/json",
				},
			},
		);

		if (!response.ok) {
			throw new ActionError("Impossible de récupérer le prix du carburant.");
		}

		const data: ApiResponse = await response.json();

		const currentFuel = data.Fuels.find(
			(_fuel) =>
				_fuel.short_name.toLowerCase() ===
				translateFuelsForApi(fuel).toLowerCase(),
		);

		return currentFuel?.Price;
	});

const translateFuelsForApi = (fuel: CarType) => {
	switch (fuel) {
		case "DIESEL":
			return "Gazole";
		case "ETHANOL":
			return "E85";
		case "OIL":
			return "SP95";
	}
};
