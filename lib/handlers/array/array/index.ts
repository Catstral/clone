import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const ARRAY_CLONER = ((v, context) => {
	switch (context.type) {
		case "DEEP": {
			return v.map((item) => context.cloner.deep(item, context.strict));
		}
		case "SHALLOW": {
			return Array.from(v);
		}
		default: {
			throw new ClonerError(`Failed to determine the context type for cloning, got ${context.type}`);
		}
	}
}) satisfies CloneHandlerClone<unknown[]>;
