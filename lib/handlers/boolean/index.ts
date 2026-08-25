import type { CloneHandler } from "~/cloner.ts";

export const BOOLEAN_CLONE_HANDLER = {
	checker: (v) => typeof v === "boolean",
	clone: (v) => v,
} satisfies CloneHandler<boolean>;
