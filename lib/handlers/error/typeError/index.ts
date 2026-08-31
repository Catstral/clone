import type { CloneHandlerClone } from "~/cloner";

export const TYPE_ERROR_CLONER = ((v) => {
	const error = new TypeError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<TypeError>;
