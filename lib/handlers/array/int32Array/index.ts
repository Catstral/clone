import type { CloneHandlerClone } from "~/cloner";

export const INT32_ARRAY_CLONER = ((v) => {
	return new Int32Array(v);
}) satisfies CloneHandlerClone<Int32Array>;
