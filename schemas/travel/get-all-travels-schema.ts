import { SortByEnum } from "@/enums/sort-by-enum";
import { z } from "zod";

export const getAllTravelsSchema = z.object({
	filters: z
		.object({
			name: z.string().optional(),
		})
		.optional(),
	sortBy: z
		.object({
			travelDate: z.nativeEnum(SortByEnum).default(SortByEnum.DESC),
		})
		.optional(),
});
