import { type CloneHandlerClone, Cloner } from "~/cloner";

export const CLONER_CLONER = ((v) => Cloner.from(v)) satisfies CloneHandlerClone<Cloner>;
