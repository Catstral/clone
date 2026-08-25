import type { CloneHandler } from "~/cloner";

export const NULL_CLONE_HANDLER = {
	checker: (v) => v === null,
	clone: () => null,
} satisfies CloneHandler<null>;
