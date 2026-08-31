import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_ZONED_DATE_TIME_CLONER = ((v) => {
	return Temporal.ZonedDateTime.from(v);
}) satisfies CloneHandlerClone<Temporal.ZonedDateTime>;
