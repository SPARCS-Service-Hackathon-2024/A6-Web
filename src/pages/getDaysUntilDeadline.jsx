import { differenceInCalendarDays, parseISO } from "date-fns";

export const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = parseISO(deadline);
    return differenceInCalendarDays(deadlineDate, today);
};
