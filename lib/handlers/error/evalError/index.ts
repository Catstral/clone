import type { CloneHandlerClone } from "~/cloner";

export const EVAL_ERROR_CLONER = ((v) => {
	const error = new EvalError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<EvalError>;
