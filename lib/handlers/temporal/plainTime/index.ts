import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_PLAIN_TIME_CLONER = ((v) => {
	return Temporal.PlainTime.from(v);
}) satisfies CloneHandlerClone<Temporal.PlainTime>;
