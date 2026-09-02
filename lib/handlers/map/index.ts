import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const MAP_CLONER = ((v, context) => {
	const cloned = new Map();

	let callback: (key: unknown, item: unknown) => void;

	switch (context.type) {
		case "DEEP": {
			callback = (key, item) => {
				cloned.set(context.cloner.deep(key, context.strict), context.cloner.deep(item, context.strict));
			};

			break;
		}
		case "SHALLOW": {
			callback = (key, item) => {
				cloned.set(key, item);
			};

			break;
		}
		default: {
			throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
		}
	}

	for (const [key, item] of v.entries()) {
		callback(key, item);
	}

	return cloned;
}) satisfies CloneHandlerClone<Map<unknown, unknown>>;
