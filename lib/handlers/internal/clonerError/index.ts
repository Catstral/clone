import type { CloneHandlerClone } from "~/cloner";
import { ClonerError } from "~/error";

export const CLONER_ERROR_CLONER = ((v) => {
	const error = new ClonerError(v.message);

	error.cause = v.cause;
	error.name = v.name;
	error.stack = v.stack;

	return error;
}) satisfies CloneHandlerClone<ClonerError>;
