import { constants } from "@/constants/constants";

export function isValidFrenchAddress(address: string): boolean {
	return constants.frenchAddressRegex.test(address);
}
