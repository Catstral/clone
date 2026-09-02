import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_PLAIN_DATE_CLONER = ((v) => {
	return Temporal.PlainDate.from(v);
}) satisfies CloneHandlerClone<Temporal.PlainDate>;
