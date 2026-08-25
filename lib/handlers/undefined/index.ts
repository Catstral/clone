import type { CloneHandler } from "~/cloner";

export const UNDEFINED_CLONE_HANDLER = {
	checker: (v) => v === undefined,
	clone: () => undefined,
} satisfies CloneHandler<undefined>;
