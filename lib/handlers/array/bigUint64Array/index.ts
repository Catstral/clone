import type { CloneHandlerClone } from "~/cloner";

export const BIG_UINT64_ARRAY_CLONER = ((v) => {
	return new BigUint64Array(v);
}) satisfies CloneHandlerClone<BigUint64Array>;
