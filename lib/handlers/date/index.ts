import type { CloneHandlerClone } from "~/cloner.ts";

export const DATE_CLONER = ((v) => new Date(v)) satisfies CloneHandlerClone<Date>;
