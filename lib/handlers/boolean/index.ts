import type { CloneHandlerClone } from "~/cloner.ts";

export const BOOLEAN_CLONER = ((v) => v) satisfies CloneHandlerClone<boolean>;
