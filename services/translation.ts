import type { CarType } from "@prisma/client";

export const translateCarTypeEnum = (carType: CarType) => {
	switch (carType) {
		case "OIL":
			return "Essence";
		case "DIESEL":
			return "Diesel";
		case "ETHANOL":
			return "Ethanol";
	}
};
