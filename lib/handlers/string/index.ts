import type { CloneHandlerClone } from "~/cloner";

export const STRING_CLONER = ((v) => v) satisfies CloneHandlerClone<string>;
