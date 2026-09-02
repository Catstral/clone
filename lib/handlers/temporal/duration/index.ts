import type { CloneHandlerClone } from "~/cloner";

export const TEMPORAL_DURATION_CLONER = ((v) => {
	return Temporal.Duration.from(v);
}) satisfies CloneHandlerClone<Temporal.Duration>;
