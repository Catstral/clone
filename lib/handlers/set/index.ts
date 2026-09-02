import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const SET_CLONER = ((v, context) => {
	const cloned = new Set();

	for (const value of v) {
		switch (context.type) {
			case "DEEP": {
				cloned.add(context.cloner.deep(value, context.strict));

				break;
			}
			case "SHALLOW": {
				cloned.add(value);

				break;
			}
			default: {
				throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
			}
		}
	}

	return cloned;
}) satisfies CloneHandlerClone<Set<unknown>>;
