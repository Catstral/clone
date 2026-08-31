import type { CloneHandlerClone } from "~/cloner";

export const MAP_CLONER = ((v, cloner) => {
	const cloned = new Map();

	for (const [key, value] of v.entries()) {
		cloned.set(cloner.clone(key), cloner.clone(value, true));
	}

	return cloned;
}) satisfies CloneHandlerClone<Map<unknown, unknown>>;
