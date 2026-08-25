import type { CloneHandler } from "~/cloner";

export const SET_CLONE_HANDLER = {
	checker: (v) => v instanceof Set,
	clone: (v, cloner) => {
		const cloned = new Set();

		for (const value of v) {
			cloned.add(cloner.clone(value));
		}

		return cloned;
	},
} satisfies CloneHandler<Set<unknown>>;
