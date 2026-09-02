import type { CloneHandlerClone } from "~/cloner";

export const UINT8_CLAMPED_ARRAY_CLONER = ((v) => {
	return new Uint8ClampedArray(v);
}) satisfies CloneHandlerClone<Uint8ClampedArray>;
