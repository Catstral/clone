import type { CloneHandler } from "~/cloner";

export const STRING_CLONE_HANDLER = {
	checker: (v) => typeof v === "string",
	clone: (v) => v,
} satisfies CloneHandler<string>;
