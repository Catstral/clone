import { Cloner } from "./cloner";

/**
 * A simple wrapper around creating a {@link Cloner} and cloning the value.
 */
export function clone<T>(value: T, strict = false): T {
	const cloner = new Cloner();

	return cloner.clone(value, strict);
}

/**
 * A simple wrapper around creating a {@link Cloner} and strict cloning the value.
 */
export function cloneStrict<T>(value: T): T {
	const cloner = new Cloner();

	return cloner.cloneStrict(value);
}
