import { z } from "zod";

export const getUserSchema = z.object({
	userId: z.string(),
});
