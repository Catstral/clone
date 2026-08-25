import type { CloneHandler } from "~/cloner.ts";

export const REGEXP_CLONE_HANDLER = {
	checker: (v) => v instanceof RegExp,
	clone: (v) => new RegExp(v),
} satisfies CloneHandler<RegExp>;
