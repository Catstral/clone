import type { CloneHandlerClone } from "~/cloner";

export const SHARED_ARRAY_BUFFER_CLONER = ((v) => {
	return v.slice(0, v.byteLength);
}) satisfies CloneHandlerClone<SharedArrayBuffer>;
