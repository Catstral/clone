import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_PLAIN_DATE_TIME_CLONER = ((v) => {
	return Temporal.PlainDateTime.from(v);
}) satisfies CloneHandlerClone<Temporal.PlainDateTime>;
