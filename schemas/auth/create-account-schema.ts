import { z } from "zod";

export const createAccountSchema = z.object({
	username: z.string(),
	password: z.string(),
});
