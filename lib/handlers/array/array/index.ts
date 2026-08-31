import type { CloneHandlerClone } from "~/cloner";

export const ARRAY_CLONER = ((v, cloner) => {
	const cloned = [];

	for (const value of v) {
		cloned.push(cloner.clone(value, true));
	}

	return cloned;
}) satisfies CloneHandlerClone<unknown[]>;
