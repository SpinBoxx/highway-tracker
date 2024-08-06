import { getSession } from "@/actions/auth/session/get-session-action";
import {
	DEFAULT_SERVER_ERROR_MESSAGE,
	createSafeActionClient,
} from "next-safe-action";
import { ActionError } from "./create-safe-action";

export const createAuthAction = createSafeActionClient({
	handleReturnedServerError(e) {
		// In this case, we can use the 'MyCustomError` class to unmask errors
		// and return them with their actual messages to the client.

		if (e instanceof ActionError) {
			return e.message;
		}

		// Every other error that occurs will be masked with the default message.
		return DEFAULT_SERVER_ERROR_MESSAGE;
	},
}).use(async ({ next }) => {
	const session = await getSession();
	if (!session) {
		throw new Error("Session not found !");
	}
	const user = session.user;
	if (!user) {
		throw new Error("Session invalid !");
	}

	return next({ ctx: { user } });
});
