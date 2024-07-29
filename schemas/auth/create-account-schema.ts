import { z } from "zod";

export const passwordMinLength = 7;

export const createAccountSchema = z.object({
	username: z.string(),
	password: z
		.string()
		.min(
			passwordMinLength,
			"Pour votre sécurité, votre mot de passe doit faire 10 caractères minimum.",
		),
});
