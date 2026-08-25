import type { CloneHandler } from "~/cloner.ts";

export const DATE_CLONE_HANDLER = {
	checker: (v) => v instanceof Date,
	clone: (v) => new Date(v),
} satisfies CloneHandler<Date>;
