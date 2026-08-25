import type { CloneHandler } from "~/cloner.ts";

export const BIGINT_CLONE_HANDLER = {
	checker: (v): v is bigint => v instanceof BigInt,
	clone: (v) => BigInt(v),
} satisfies CloneHandler<bigint>;
