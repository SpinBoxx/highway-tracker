"use server";

import { createAuthAction } from "@/lib/create-safe-auth-action";
import { db } from "@/lib/prisma";
import { getAllTravelsSchema } from "@/schemas/travel/get-all-travels-schema";

export const getAllTravelsAction = createAuthAction
	.schema(getAllTravelsSchema)
	.action(async ({ parsedInput: { filters, sortBy }, ctx: { user } }) => {
		const travels = await db.travel.findMany({
			where: {
				name: {
					contains: filters?.name,
				},
				userId: user.id,
			},
			orderBy: {
				startDate: sortBy?.travelDate ?? undefined,
			},
		});
		return travels;
	});
