import type { CloneHandler } from "~/cloner";

export const NUMBER_CLONE_HANDLER = {
	checker: (v) => typeof v === "number",
	clone: (v) => v,
} satisfies CloneHandler<number>;
