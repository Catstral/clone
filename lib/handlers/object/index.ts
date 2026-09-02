import type { CloneHandlerClone } from "~/cloner.ts";
import { ClonerError } from "~/error";

export const OBJECT_CLONER = ((v, context) => {
	const cloned: Record<string | number | symbol, unknown> = {};

	// NOTE: cannot use `Object.entries` as that only includes enumerable keys.
	const namedKeys: (string | symbol)[] = Object.getOwnPropertyNames(v);
	const symbolKeys: (string | symbol)[] = Object.getOwnPropertySymbols(v);
	const allKeys = namedKeys.concat(symbolKeys);

	let callback: (key: string | symbol) => void;

	switch (context.type) {
		case "DEEP": {
			callback = (key) => {
				cloned[context.cloner.deep(key, context.strict)] = context.cloner.deep(v[key], context.strict);
			};

			break;
		}
		case "SHALLOW": {
			callback = (key) => {
				cloned[key] = v[key];
			};

			break;
		}
		default: {
			throw new ClonerError(`Failed to determine the context type for cloning, got: ${context.type}`);
		}
	}

	for (const key of allKeys) {
		const descriptor = Object.getOwnPropertyDescriptor(v, key);

		if (!descriptor) {
			throw new ClonerError("Failed to find descriptor of key for cloning object");
		}

		Object.defineProperty(cloned, key, descriptor);
		callback(key);
	}

	return cloned;
}) satisfies CloneHandlerClone<Record<string | number | symbol, unknown>>;
