import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_PLAIN_YEAR_MONTH_CLONER = ((v) => {
	return Temporal.PlainYearMonth.from(v);
}) satisfies CloneHandlerClone<Temporal.PlainYearMonth>;
