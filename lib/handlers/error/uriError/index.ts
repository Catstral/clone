import type { CloneHandlerClone } from "~/cloner";

export const URI_ERROR_CLONER = ((v) => {
	const error = new URIError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<URIError>;
