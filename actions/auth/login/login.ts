"use server";

import { ActionError, createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/prisma";
import { loginSchema } from "@/schemas/auth/login-schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const loginAction = createSafeAction
	.schema(loginSchema)
	.action(async ({ parsedInput: { password, username } }) => {
		const user = await db.user.findFirst({
			where: {
				username,
			},
		});

		if (!user) {
			throw new ActionError("Mot de passe incorrect !");
		}

		const isPasswordEqual = await bcrypt.compare(password, user.password);

		if (!isPasswordEqual) {
			throw new ActionError("Mot de passe incorrect !");
		}

		const { JWT_SECRET_KEY } = process.env;
		if (!JWT_SECRET_KEY) {
			throw new ActionError(
				"Une erreur innatendue est arrivée. Veuillez contacter le support.",
			);
		}

		const { password: userPassword, ...tokenPayload } = user;

		const token = jwt.sign({ user: tokenPayload }, JWT_SECRET_KEY, {
			expiresIn: "7d",
		});

		cookies().set("token", token, { httpOnly: true });

		return {
			successMessage: "Vous etes connecte",
		};
	});
