import type { CloneHandlerClone } from "~/cloner";

export const AGGREGATE_ERROR_CLONER = ((v) => {
	const error = new AggregateError(v.errors, v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<AggregateError>;
