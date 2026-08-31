import type { CloneHandlerClone } from "~/cloner";

export const SET_CLONER = ((v, cloner) => {
	const cloned = new Set();

	for (const value of v) {
		cloned.add(cloner.clone(value, true));
	}

	return cloned;
}) satisfies CloneHandlerClone<Set<unknown>>;
