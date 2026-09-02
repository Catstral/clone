import type { CloneHandlerClone } from "~/cloner";

export const UINT32_ARRAY_CLONER = ((v) => {
	return new Uint32Array(v);
}) satisfies CloneHandlerClone<Uint32Array>;
