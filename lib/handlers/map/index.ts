import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const MAP_CLONER = ((v, context) => {
	const cloned = new Map();

	for (const [key, value] of v.entries()) {
		switch (context.type) {
			case "DEEP": {
				cloned.set(context.cloner.deep(key, context.strict), context.cloner.deep(value, context.strict));

				break;
			}
			case "SHALLOW": {
				cloned.set(key, value);

				break;
			}
			default: {
				throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
			}
		}
	}

	return cloned;
}) satisfies CloneHandlerClone<Map<unknown, unknown>>;
