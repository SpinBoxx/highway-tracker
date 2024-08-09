"use server";

import { createAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prisma";
import { getUserSchema } from "@/schemas/user/get-user-schema";

export const getUserAction = createAction
	.schema(getUserSchema)
	.action(async ({ parsedInput: { userId } }) => {
		const user = await db.user.findFirst({
			where: {
				id: userId,
			},
		});

		return user;
	});
