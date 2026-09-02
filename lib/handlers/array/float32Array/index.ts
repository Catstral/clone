import type { CloneHandlerClone } from "~/cloner";

export const FLOAT32_ARRAY_CLONER = ((v) => {
	return new Float32Array(v);
}) satisfies CloneHandlerClone<Float32Array>;
