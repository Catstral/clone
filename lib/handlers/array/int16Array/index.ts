import type { CloneHandlerClone } from "~/cloner";

export const INT16_ARRAY_CLONER = ((v) => {
	return new Int16Array(v);
}) satisfies CloneHandlerClone<Int16Array>;
