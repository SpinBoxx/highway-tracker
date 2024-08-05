import type { CarType } from "@prisma/client";

export const translateCarTypeEnum = (carType: CarType) => {
	switch (carType) {
		case "DIESEL":
			return "Diesel";
		case "ETHANOL":
			return "Ethanol";
		case "OIL":
			return "Essence";
	}
};
