import type { CloneHandlerClone } from "~/cloner";

export const NUMBER_CLONER = ((v) => v) satisfies CloneHandlerClone<number>;
