import type { CloneHandler } from "~/cloner";

export const MAP_CLONE_HANDLER = {
	checker: (v) => v instanceof Map,
	clone: (v, cloner) => {
		const cloned = new Map();

		for (const [key, value] of v.entries()) {
			cloned.set(cloner.clone(key), cloner.clone(value));
		}

		return cloned;
	},
} satisfies CloneHandler<Map<unknown, unknown>>;
