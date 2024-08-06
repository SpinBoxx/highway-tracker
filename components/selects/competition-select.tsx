import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { translateCompetitionEnum } from "@/services/translation";
import { Competition } from "@prisma/client";

interface Props {
	onValueChange: () => void;
	value: Competition;
}

export function CompetitionSelect({ onValueChange, value }: Props) {
	return (
		<Select
			onValueChange={onValueChange}
			defaultValue={Competition.CHAMPIONSHIP}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Compétition" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Object.values(Competition).map((competition) => (
						<SelectItem key={competition} value={competition}>
							{translateCompetitionEnum(competition)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
