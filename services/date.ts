import { format, parseISO, sub } from "date-fns";
import { fr } from "date-fns/locale";

export const getDateInFrench = (date: Date) => {
	const newDate = sub(date, { hours: 2 });
	return format(newDate, "dd/MM/yyyy", { locale: fr });
};
