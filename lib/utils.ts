import { Cloner } from "./cloner";

/**
 * A simple wrapper around creating a {@link Cloner} and deep cloning the value.
 */
export function clone<T>(value: T, strict = false): T {
	const cloner = new Cloner();

	return cloner.clone(value, strict);
}

/**
 * A simple wrapper around creating a {@link Cloner} and strict deep cloning the value.
 */
export function cloneStrict<T>(value: T): T {
	const cloner = new Cloner();

	return cloner.cloneStrict(value);
}

/**
 * A simple wrapper around creating a {@link Cloner} and deep cloning the value.
 */
export function cloneDeep<T>(value: T, strict = false): T {
	const cloner = new Cloner();

	return cloner.deep(value, strict);
}

/**
 * A simple wrapper around creating a {@link Cloner} and shallow cloning the value.
 */
export function cloneShallow<T>(value: T, strict = false): T {
	const cloner = new Cloner();

	return cloner.shallow(value, strict);
}
