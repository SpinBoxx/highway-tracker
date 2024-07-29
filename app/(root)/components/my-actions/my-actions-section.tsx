import { FileUp, Plus } from "lucide-react";
import CustomSeparator from "../custom-separator";
import CardAction from "./card-action";

const MyActionsSection = () => {
	return (
		<div>
			<CardAction
				Icon={Plus}
				className="px-4"
				actionTitle="Créer un trajet"
				actionDescription="lorem ipsuesfsfsef fsef jfk sf"
				onClick={() => {}}
			/>
			<CustomSeparator className="h-1.5" />
			<CardAction
				Icon={FileUp}
				className="px-4"
				actionTitle="Exporter mes trajets"
				actionDescription="lorem ipsuesfsfsef fsef jfk sf"
				onClick={() => {}}
			/>
			<CustomSeparator className="h-1.5" />
		</div>
	);
};

export default MyActionsSection;
