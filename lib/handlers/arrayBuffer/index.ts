import type { CloneHandlerClone } from "~/cloner";

export const ARRAY_BUFFER_CLONER = ((v) => {
	if ("transfer" in v && typeof v.transfer === "function") {
		return v.transfer();
	}

	return v.slice(0, v.byteLength);
}) satisfies CloneHandlerClone<ArrayBuffer>;
