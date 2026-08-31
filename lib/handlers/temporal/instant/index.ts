import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_INSTANT_CLONER = ((v) => {
	return Temporal.Instant.from(v);
}) satisfies CloneHandlerClone<Temporal.Instant>;
