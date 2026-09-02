import type { CloneHandlerClone } from "~/cloner";

export const REFERENCE_ERROR_CLONER = ((v) => {
	const error = new ReferenceError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<ReferenceError>;
