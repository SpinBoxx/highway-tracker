import { CarFuel } from "@prisma/client";
import { z } from "zod";

export const getFuelPriceSchema = z.object({
	fuel: z.nativeEnum(CarFuel),
});
