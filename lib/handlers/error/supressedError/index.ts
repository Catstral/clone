import type { CloneHandlerClone } from "~/cloner";

export const SUPRESSED_ERROR_CLONER = ((v) => {
	const error = new SuppressedError(v.error, v.suppressed, v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<SuppressedError>;
