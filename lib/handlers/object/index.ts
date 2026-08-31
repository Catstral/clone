import type { CloneHandlerClone } from "~/cloner.ts";
import { ClonerError } from "~/error";

export const OBJECT_CLONER = ((v, cloner) => {
	const cloned: Record<string | number | symbol, unknown> = {};

	// NOTE: cannot use `Object.entries` as that only includes enumerable keys.
	const namedKeys = Object.getOwnPropertyNames(v);
	const symbolKeys = Object.getOwnPropertySymbols(v);
	const allKeys = [...namedKeys, ...symbolKeys];

	for (const key of allKeys) {
		const descriptor = Object.getOwnPropertyDescriptor(v, key);

		if (!descriptor) {
			throw new ClonerError("Failed to find descriptor of key for cloning object");
		}

		Object.defineProperty(cloned, key, descriptor);
		cloned[key] = cloner.clone(v[key]);
	}

	return cloned;
}) satisfies CloneHandlerClone<Record<string | number | symbol, unknown>>;
