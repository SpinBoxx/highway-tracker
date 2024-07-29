import { getSession } from "@/actions/auth/session/get-session-action";
import { Button } from "@/components/ui/button";

export default async function Home() {
	const session = await getSession();
	return (
		<div>
			<Button>Page</Button>

			<div className="flex bg-blue-500">{session?.user.username}</div>
		</div>
	);
}
