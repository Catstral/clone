import type { CloneHandler } from "~/cloner";

export const ARRAY_CLONE_HANDLER = {
	checker: (v) => Array.isArray(v),
	clone: (v, cloner) => {
		const cloned = [];

		for (const value of v) {
			cloned.push(cloner.clone(value));
		}

		return cloned;
	},
} satisfies CloneHandler<unknown[]>;
