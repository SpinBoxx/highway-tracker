import type { CarFuel, Competition } from "@prisma/client";

export const translateCarFuelEnum = (carFuel: CarFuel) => {
	switch (carFuel) {
		case "OIL":
			return "Essence";
		case "DIESEL":
			return "Diesel";
		case "ETHANOL":
			return "Ethanol";
	}
};

export const translateCompetitionEnum = (competition: Competition) => {
	switch (competition) {
		case "CHAMPIONSHIP":
			return "Championnat";
		case "CRITERIUM":
			return "Critérium";
		case "TOURNAMENT":
			return "Tournoi";
	}
};
