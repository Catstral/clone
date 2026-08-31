import type { CloneHandlerClone } from "~/cloner";

export const ERROR_CLONER = ((v) => {
	const error = new Error(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<Error>;
