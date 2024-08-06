import { getSession } from "@/actions/auth/session/get-session-action";
import CustomSeparator from "./components/custom-separator";
import MyActionsSection from "./components/my-actions/my-actions-section";
import MyTravelsSection from "./components/my-travels";

export default async function Home() {
	const session = await getSession();
	return (
		<div className="">
			<div className="px-4">
				<MyTravelsSection />
			</div>
			<CustomSeparator>Mes actions</CustomSeparator>
			<div className="">
				<MyActionsSection />
			</div>
		</div>
	);
}
