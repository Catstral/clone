import type { CloneHandlerClone } from "~/cloner.ts";

export const REGEXP_CLONE_HANDLER = ((v) => new RegExp(v)) satisfies CloneHandlerClone<RegExp>;
