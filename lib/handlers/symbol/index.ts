import type { CloneHandler } from "~/cloner.ts";

export const SYMBOL_CLONE_HANDLER = {
	checker: (v) => typeof v === "symbol",
	clone: (v) => v,
} satisfies CloneHandler<symbol>;
