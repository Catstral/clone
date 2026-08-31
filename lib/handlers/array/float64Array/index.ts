import type { CloneHandlerClone } from "~/cloner";

export const FLOAT64_ARRAY_CLONER = ((v) => {
	return new Float64Array(v);
}) satisfies CloneHandlerClone<Float64Array>;
