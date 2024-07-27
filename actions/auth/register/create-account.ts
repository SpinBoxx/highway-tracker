"use server";

import { ActionError, createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prisma";
import { createAccountSchema } from "@/schemas/auth/create-account-schema";
import bcrypt from "bcrypt";

export const createAccountAction = createSafeAction
	.schema(createAccountSchema)
	.action(async ({ parsedInput: { password, username } }) => {
		if (password.length < 8) {
			throw new ActionError(
				"Votre mot de passe doit faire 10 caractères minimum.",
			);
		}

		const isUserWithUsernameExist = await db.user.findFirst({
			where: {
				username,
			},
		});

		if (isUserWithUsernameExist) {
			throw new ActionError(
				"Votre nom d'utilisateur est déjà pris. Veuillez en choisir un nouveau !",
			);
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await db.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		if (!newUser) {
			throw new ActionError("Impossible de creer l'utiliateur");
		}
		return {
			data: newUser,
			successMessage: "Creer",
		};
	});
