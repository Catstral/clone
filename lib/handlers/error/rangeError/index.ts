import type { CloneHandlerClone } from "~/cloner";

export const RANGE_ERROR_CLONER = ((v) => {
	const error = new RangeError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<RangeError>;
