import type { CloneHandlerClone } from "~/cloner";

export const UINT16_ARRAY_CLONER = ((v) => {
	return new Uint16Array(v);
}) satisfies CloneHandlerClone<Uint16Array>;
