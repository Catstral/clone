import type { CloneHandlerClone } from "~/cloner";

export const INT8_ARRAY_CLONER = ((v) => {
	return new Int8Array(v);
}) satisfies CloneHandlerClone<Int8Array>;
