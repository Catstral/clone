import type { CloneHandlerClone } from "~/cloner.ts";

export const SYMBOL_CLONER = ((v) => v) satisfies CloneHandlerClone<symbol>;
