import type { CloneHandlerClone } from "~/cloner";

export const DATA_VIEW_CLONER = ((v) => {
	return new DataView(v.buffer, v.byteOffset, v.byteLength);
}) satisfies CloneHandlerClone<DataView>;
