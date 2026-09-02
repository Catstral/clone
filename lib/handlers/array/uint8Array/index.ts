import type { CloneHandlerClone } from "~/cloner";

export const UINT8_ARRAY_CLONER = ((v) => {
	return new Uint8Array(v);
}) satisfies CloneHandlerClone<Uint8Array>;
