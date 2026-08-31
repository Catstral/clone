import type { CloneHandlerClone } from "~/cloner";

export const SYNTAX_ERROR_CLONER = ((v) => {
	const error = new SyntaxError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<SyntaxError>;
