import type { CloneHandlerClone } from "~/cloner";

export const FLOAT16_ARRAY_CLONER = ((v) => {
	return new Float16Array(v);
}) satisfies CloneHandlerClone<Float16Array>;
