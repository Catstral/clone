import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const ARRAY_CLONER = ((v, context) => {
	return v.map((item) => {
		switch (context.type) {
			case "DEEP": {
				return context.cloner.deep(item, context.strict);
			}
			case "SHALLOW": {
				return item;
			}
			default: {
				throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
			}
		}
	});
}) satisfies CloneHandlerClone<unknown[]>;
