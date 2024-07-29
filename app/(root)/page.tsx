import { getSession } from "@/actions/auth/session/get-session-action";
import { Button } from "@/components/ui/button";
import CustomSeparator from "./components/custom-separator";
import MyActionsSection from "./components/my-actions/my-actions-section";
import MyTripsSection from "./components/my-trips";

export default async function Home() {
	const session = await getSession();
	return (
		<div className="">
			<CustomSeparator className="h-3" />
			<div className="px-4">
				<MyTripsSection />
			</div>
			<CustomSeparator>Mes actions</CustomSeparator>
			<div className="">
				<MyActionsSection />
			</div>
		</div>
	);
}
