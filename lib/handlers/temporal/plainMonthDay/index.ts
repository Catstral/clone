import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_PLAIN_MONTH_DAY_CLONER = ((v) => {
	return Temporal.PlainMonthDay.from(v);
}) satisfies CloneHandlerClone<Temporal.PlainMonthDay>;
