import type { CloneHandlerClone } from "~/cloner.ts";

export const BIGINT_CLONER = ((v) => BigInt(v)) satisfies CloneHandlerClone<bigint>;
