import { ClonerError } from "./error";
import { ARRAY_CLONER } from "./handlers/array/array";
import { BIG_INT64_ARRAY_CLONER } from "./handlers/array/bigInt64Array";
import { BIG_UINT64_ARRAY_CLONER } from "./handlers/array/bigUint64Array";
import { FLOAT16_ARRAY_CLONER } from "./handlers/array/float16Array";
import { FLOAT32_ARRAY_CLONER } from "./handlers/array/float32Array";
import { FLOAT64_ARRAY_CLONER } from "./handlers/array/float64Array";
import { INT8_ARRAY_CLONER } from "./handlers/array/int8Array";
import { INT16_ARRAY_CLONER } from "./handlers/array/int16Array";
import { INT32_ARRAY_CLONER } from "./handlers/array/int32Array";
import { UINT8_ARRAY_CLONER } from "./handlers/array/uint8Array";
import { UINT8_CLAMPED_ARRAY_CLONER } from "./handlers/array/uint8ClampedArray";
import { UINT16_ARRAY_CLONER } from "./handlers/array/uint16Array";
import { UINT32_ARRAY_CLONER } from "./handlers/array/uint32Array";
import { ARRAY_BUFFER_CLONER } from "./handlers/arrayBuffer";
import { BIGINT_CLONER } from "./handlers/bigint";
import { BOOLEAN_CLONER } from "./handlers/boolean";
import { DATA_VIEW_CLONER } from "./handlers/dataView";
import { DATE_CLONER } from "./handlers/date";
import { AGGREGATE_ERROR_CLONER } from "./handlers/error/aggregateError";
import { ERROR_CLONER } from "./handlers/error/error";
import { EVAL_ERROR_CLONER } from "./handlers/error/evalError";
import { RANGE_ERROR_CLONER } from "./handlers/error/rangeError";
import { REFERENCE_ERROR_CLONER } from "./handlers/error/referenceError";
import { SUPRESSED_ERROR_CLONER } from "./handlers/error/supressedError";
import { SYNTAX_ERROR_CLONER } from "./handlers/error/syntaxError";
import { TYPE_ERROR_CLONER } from "./handlers/error/typeError";
import { URI_ERROR_CLONER } from "./handlers/error/uriError";
import { CLONER_CLONER } from "./handlers/internal/cloner";
import { CLONER_ERROR_CLONER } from "./handlers/internal/clonerError";
import { MAP_CLONER } from "./handlers/map";
import { NUMBER_CLONER } from "./handlers/number";
import { OBJECT_CLONER } from "./handlers/object";
import { REGEXP_CLONE_HANDLER } from "./handlers/regexp";
import { SET_CLONER } from "./handlers/set";
import { SHARED_ARRAY_BUFFER_CLONER } from "./handlers/sharedArrayBuffer";
import { STRING_CLONER } from "./handlers/string";
import { SYMBOL_CLONER } from "./handlers/symbol";
import { TEMPORAL_DURATION_CLONER } from "./handlers/temporal/duration";
import { TEMPORAL_INSTANT_CLONER } from "./handlers/temporal/instant";
import { TEMPORAL_PLAIN_DATE_CLONER } from "./handlers/temporal/plainDate";
import { TEMPORAL_PLAIN_DATE_TIME_CLONER } from "./handlers/temporal/plainDateTime";
import { TEMPORAL_PLAIN_MONTH_DAY_CLONER } from "./handlers/temporal/plainMonthDay";
import { TEMPORAL_PLAIN_TIME_CLONER } from "./handlers/temporal/plainTime";
import { TEMPORAL_PLAIN_YEAR_MONTH_CLONER } from "./handlers/temporal/plainYearMonth";
import { TEMPORAL_ZONED_DATE_TIME_CLONER } from "./handlers/temporal/zonedDateTime";

type ConstructorFunction = ((...args: never) => unknown) | (new (...args: never) => unknown);

/**
 * A function to check if a value should be cloned by a given handler.
 */
export type CloneHandlerChecker<T> = (value: unknown) => value is T;
/**
 * A function to clone a given value for a handler.
 */
export type CloneHandlerClone<T> = (value: T, cloner: Cloner) => T;

/**
 * A custom clone handler.
 */
export interface CloneHandler<T> {
	/**
	 * The ID of this handler, if specified it can later be removed from the registry.
	 *
	 * If a handler already exists with this ID in the registry it will throw an error.
	 */
	id?: string;
	/**
	 * A function to check if this handler should clone this value.
	 */
	checker: CloneHandlerChecker<T>;
	/**
	 * A function to clone the given checked value.
	 */
	clone: CloneHandlerClone<T>;
}

export class Cloner {
	static #globalRegistry: CloneHandler<unknown>[] = [];
	static #globalRegistryWithIds: Map<string, CloneHandler<unknown>> = new Map();

	/**
	 * Registers a new handler to the global registry. If that handler has an ID, then it will be synced to an ID based registry
	 * and can then be removed/replaced later on. If no ID is used, then it will always exist in that registry.
	 *
	 * Upon init of a cloner, that registry will be synced to the registry of that instance.
	 *
	 * Do note that after init of a cloner, if something is registered here it will not be part of that instance.
	 *
	 * @throws {ClonerError} If the given handler has an ID that has already been registered.
	 */
	public static registerHandler<T>(handler: CloneHandler<T>): void;
	public static registerHandler<T>(checker: CloneHandlerChecker<T>, clone: CloneHandlerClone<T>): void;
	public static registerHandler<T>(
		handlerOrChecker: CloneHandler<T> | CloneHandlerChecker<T>,
		clone?: CloneHandlerClone<T>,
	): void {
		if (typeof handlerOrChecker === "function") {
			if (!clone) {
				throw new ClonerError("Got a checker function, but is missing a cloning function");
			}

			Cloner.#globalRegistry.push({
				checker: handlerOrChecker,
				clone,
			} as CloneHandler<unknown>);

			return;
		}

		if (typeof handlerOrChecker.id === "string") {
			if (Cloner.#globalRegistryWithIds.has(handlerOrChecker.id)) {
				throw new ClonerError(
					`A handler with the given ID of '${handlerOrChecker.id}' has already been registered`,
				);
			}

			Cloner.#globalRegistryWithIds.set(handlerOrChecker.id, handlerOrChecker as CloneHandler<unknown>);

			return;
		}

		Cloner.#globalRegistry.push(handlerOrChecker as CloneHandler<unknown>);
	}

	/**
	 * Sets a new handler in the ID based registry, allowing it to be removed/replaced later on.
	 * If a handler already exists in this registry with that ID, then it is replaced.
	 *
	 * Upon init of a cloner, that registry will be synced to the registry of that instance.
	 *
	 * Do note that after init of a cloner, if something is registered here it will not be part of that instance.
	 *
	 * @throws {ClonerError} If the specified ID does not equal the ID found inside the handler object (Only applies if that ID inside the handler is specified).
	 */
	public static sethandler<T>(id: string, handler: CloneHandler<T>) {
		if (typeof handler.id === "string" && id !== handler.id) {
			throw new ClonerError(`The specified ID '${id}' and handler ID '${handler.id}' do not match`);
		}

		Cloner.#globalRegistryWithIds.set(id, {
			...handler,
			id,
		} as CloneHandler<unknown>);
	}

	/**
	 * Removed a handler from the ID based registry.
	 *
	 * Upon init of a cloner, that registry will be synced to the registry of that instance.
	 *
	 * Do note that after init of a cloner, if something is registered here it will not be part of that instance.
	 */
	public static removeHandler(id: string): void {
		Cloner.#globalRegistryWithIds.delete(id);
	}

	/**
	 * Returns a new Cloner instance based on a cloner instance.
	 */
	public static from(cloner: Cloner): Cloner {
		const cloned = new Cloner();

		cloned.#registry = cloner.#registry;
		cloned.#registryWithIds = cloner.#registryWithIds;

		return cloned;
	}

	#registry: CloneHandler<unknown>[];
	#registryWithIds: Map<string, CloneHandler<unknown>>;
	#internalRegistry: Map<ConstructorFunction, CloneHandlerClone<unknown>> = new Map();

	public constructor() {
		this.#registry = Cloner.#globalRegistry;
		this.#registryWithIds = Cloner.#globalRegistryWithIds;

		this.#handleInternalRegistry();
	}

	#registerInternalHandler<T>(
		constructorFunction: ConstructorFunction | undefined,
		handler: CloneHandlerClone<T>,
	): void {
		if (typeof constructorFunction === "undefined") {
			return;
		}

		this.#internalRegistry.set(constructorFunction, handler as CloneHandlerClone<unknown>);
	}

	#handleInternalRegistry(): void {
		this.#registerInternalHandler(String, STRING_CLONER);
		this.#registerInternalHandler(Number, NUMBER_CLONER);
		this.#registerInternalHandler(Boolean, BOOLEAN_CLONER);
		this.#registerInternalHandler(Symbol, SYMBOL_CLONER);
		this.#registerInternalHandler(BigInt, BIGINT_CLONER);

		this.#registerInternalHandler(Array, ARRAY_CLONER);
		this.#registerInternalHandler(Object, OBJECT_CLONER);

		this.#registerInternalHandler(Date, DATE_CLONER);
		this.#registerInternalHandler(Set, SET_CLONER);
		this.#registerInternalHandler(Map, MAP_CLONER);
		this.#registerInternalHandler(RegExp, REGEXP_CLONE_HANDLER);

		this.#registerInternalHandler(BigInt64Array, BIG_INT64_ARRAY_CLONER);
		this.#registerInternalHandler(BigUint64Array, BIG_UINT64_ARRAY_CLONER);
		this.#registerInternalHandler(Float16Array, FLOAT16_ARRAY_CLONER);
		this.#registerInternalHandler(Float32Array, FLOAT32_ARRAY_CLONER);
		this.#registerInternalHandler(Float64Array, FLOAT64_ARRAY_CLONER);
		this.#registerInternalHandler(Int8Array, INT8_ARRAY_CLONER);
		this.#registerInternalHandler(Int16Array, INT16_ARRAY_CLONER);
		this.#registerInternalHandler(Int32Array, INT32_ARRAY_CLONER);
		this.#registerInternalHandler(Uint8Array, UINT8_ARRAY_CLONER);
		this.#registerInternalHandler(Uint8ClampedArray, UINT8_CLAMPED_ARRAY_CLONER);
		this.#registerInternalHandler(Uint16Array, UINT16_ARRAY_CLONER);
		this.#registerInternalHandler(Uint32Array, UINT32_ARRAY_CLONER);

		this.#registerInternalHandler(Error, ERROR_CLONER);
		this.#registerInternalHandler(AggregateError, AGGREGATE_ERROR_CLONER);
		this.#registerInternalHandler(EvalError, EVAL_ERROR_CLONER);
		this.#registerInternalHandler(RangeError, RANGE_ERROR_CLONER);
		this.#registerInternalHandler(ReferenceError, REFERENCE_ERROR_CLONER);
		this.#registerInternalHandler(SuppressedError, SUPRESSED_ERROR_CLONER);
		this.#registerInternalHandler(SyntaxError, SYNTAX_ERROR_CLONER);
		this.#registerInternalHandler(TypeError, TYPE_ERROR_CLONER);
		this.#registerInternalHandler(URIError, URI_ERROR_CLONER);

		this.#registerInternalHandler(ArrayBuffer, ARRAY_BUFFER_CLONER);
		this.#registerInternalHandler(SharedArrayBuffer, SHARED_ARRAY_BUFFER_CLONER);
		this.#registerInternalHandler(DataView, DATA_VIEW_CLONER);

		if (typeof Temporal !== "undefined") {
			this.#registerInternalHandler(Temporal.Duration, TEMPORAL_DURATION_CLONER);
			this.#registerInternalHandler(Temporal.Instant, TEMPORAL_INSTANT_CLONER);
			this.#registerInternalHandler(Temporal.PlainDate, TEMPORAL_PLAIN_DATE_CLONER);
			this.#registerInternalHandler(Temporal.PlainDateTime, TEMPORAL_PLAIN_DATE_TIME_CLONER);
			this.#registerInternalHandler(Temporal.PlainMonthDay, TEMPORAL_PLAIN_MONTH_DAY_CLONER);
			this.#registerInternalHandler(Temporal.PlainTime, TEMPORAL_PLAIN_TIME_CLONER);
			this.#registerInternalHandler(Temporal.PlainYearMonth, TEMPORAL_PLAIN_YEAR_MONTH_CLONER);
			this.#registerInternalHandler(Temporal.ZonedDateTime, TEMPORAL_ZONED_DATE_TIME_CLONER);
		}

		this.#registerInternalHandler(Cloner, CLONER_CLONER);
		this.#registerInternalHandler(ClonerError, CLONER_ERROR_CLONER);
	}

	/**
	 * Registers a new handler to the registry. If that handler has an ID, then it will be synced to an ID based registry
	 * and can then be removed/replaced later on. If no ID is used, then it will always exist in that registry.
	 *
	 * @throws {ClonerError} If the given handler has an ID that has already been registered.
	 */
	public registerHandler<T>(this: Cloner, handler: CloneHandler<T>): void;
	public registerHandler<T>(this: Cloner, checker: CloneHandlerChecker<T>, clone: CloneHandlerClone<T>): void;
	public registerHandler<T>(
		this: Cloner,
		handlerOrChecker: CloneHandler<T> | CloneHandlerChecker<T>,
		clone?: CloneHandlerClone<T>,
	): void {
		if (typeof handlerOrChecker === "function") {
			if (!clone) {
				throw new ClonerError("Got a checker function, but is missing a cloning function");
			}

			this.#registry.push({
				checker: handlerOrChecker,
				clone,
			} as CloneHandler<unknown>);

			return;
		}

		if (typeof handlerOrChecker.id === "string") {
			if (this.#registryWithIds.has(handlerOrChecker.id)) {
				throw new ClonerError(
					`A handler with the given ID of '${handlerOrChecker.id}' has already been registered`,
				);
			}

			this.#registryWithIds.set(handlerOrChecker.id, handlerOrChecker as CloneHandler<unknown>);

			return;
		}

		this.#registry.push(handlerOrChecker as CloneHandler<unknown>);
	}

	/**
	 * Sets a new handler in the ID based registry, allowing it to be removed/replaced later on.
	 * If a handler already exists in this registry with that ID, then it is replaced.
	 *
	 * @throws {ClonerError} If the specified ID does not equal the ID found inside the handler object (Only applies if that ID inside the handler is specified).
	 */
	public sethandler<T>(id: string, handler: CloneHandler<T>) {
		if (typeof handler.id === "string" && id !== handler.id) {
			throw new ClonerError(`The specified ID '${id}' and handler ID '${handler.id}' do not match`);
		}

		this.#registryWithIds.set(id, {
			...handler,
			id,
		} as CloneHandler<unknown>);
	}

	/**
	 * Removed a handler from the ID based registry.
	 */
	public removeHandler(id: string): void {
		this.#registryWithIds.delete(id);
	}

	#readPrototypeConstructor(v: unknown): ConstructorFunction | null {
		try {
			return Object.getPrototypeOf(v).constructor;
		} catch {
			return null;
		}
	}

	/**
	 * Deep-clone a value.
	 *
	 * Do note that if `strict` is not specified/false then any value that isn't cloned will be returned as is.
	 *
	 * @throws {ClonerError} If any value is missing a handler and strict mode is enabled, it will throw intead of clone.
	 */
	public clone<T>(this: Cloner, value: T, strict = false): T {
		let hasCloned = false;
		let cloned: T = value;

		for (const handler of Array.from(this.#registryWithIds.values()).concat(this.#registry)) {
			if (handler.checker(value)) {
				cloned = handler.clone(value, this) as T;
				hasCloned = true;

				break;
			}
		}

		if (!hasCloned) {
			if (value == null) {
				return cloned;
			}

			const constructorFunction = this.#readPrototypeConstructor(value);

			if (constructorFunction) {
				const cloner = this.#internalRegistry.get(constructorFunction);

				if (cloner) {
					cloned = cloner(value, this) as T;
					hasCloned = true;
				}
			}
		}

		if (!hasCloned && strict) {
			throw new ClonerError("The given value doesn't have a cloner specified for it.");
		}

		return cloned;
	}
}
