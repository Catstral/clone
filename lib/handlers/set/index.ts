import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const SET_CLONER = ((v, context) => {
	const cloned = new Set();

	let callback: (item: unknown) => void;

	switch (context.type) {
		case "DEEP": {
			callback = (item) => {
				cloned.add(context.cloner.deep(item, context.strict));
			};

			break;
		}
		case "SHALLOW": {
			callback = (item) => {
				cloned.add(item);
			};

			break;
		}
		default: {
			throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
		}
	}

	for (const item of v) {
		callback(item);
	}

	return cloned;
}) satisfies CloneHandlerClone<Set<unknown>>;
