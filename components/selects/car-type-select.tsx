import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { translateCarTypeEnum } from "@/services/translation";
import { CarType } from "@prisma/client";

interface Props {
	onValueChange: () => void;
	value: CarType;
}

export function CarTypeSelect({ onValueChange, value }: Props) {
	return (
		<Select onValueChange={onValueChange} defaultValue={CarType.OIL}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Votre type de voiture" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Object.values(CarType).map((cartType) => (
						<SelectItem key={cartType} value={cartType}>
							{translateCarTypeEnum(cartType)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
