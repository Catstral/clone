import type { CloneHandlerClone } from "~/cloner";

export const BIG_INT64_ARRAY_CLONER = ((v) => {
	return new BigInt64Array(v);
}) satisfies CloneHandlerClone<BigInt64Array>;
