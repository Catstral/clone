import { ClonerError } from "./error";
import { ARRAY_CLONE_HANDLER } from "./handlers/array";
import { BIGINT_CLONE_HANDLER } from "./handlers/bigint";
import { BOOLEAN_CLONE_HANDLER } from "./handlers/boolean";
import { DATE_CLONE_HANDLER } from "./handlers/date";
import { MAP_CLONE_HANDLER } from "./handlers/map";
import { NULL_CLONE_HANDLER } from "./handlers/null";
import { NUMBER_CLONE_HANDLER } from "./handlers/number";
import { OBJECT_CLONE_HANDLER } from "./handlers/object";
import { REGEXP_CLONE_HANDLER } from "./handlers/regexp";
import { SET_CLONE_HANDLER } from "./handlers/set";
import { STRING_CLONE_HANDLER } from "./handlers/string";
import { SYMBOL_CLONE_HANDLER } from "./handlers/symbol";
import { TEMPORAL_HANDLERS } from "./handlers/temporal";
import { UNDEFINED_CLONE_HANDLER } from "./handlers/undefined";

export type CloneHandlerChecker<T> = (value: unknown) => value is T;
export type CloneHandlerClone<T> = (value: T, cloner: Cloner) => T;

export interface CloneHandler<T> {
	checker: CloneHandlerChecker<T>;
	clone: CloneHandlerClone<T>;
}

export class Cloner {
	private static registry: CloneHandler<unknown>[] = [];

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

			Cloner.registry.push({
				checker: handlerOrChecker,
				clone,
			} as CloneHandler<unknown>);

			return;
		}

		Cloner.registry.push(handlerOrChecker as CloneHandler<unknown>);
	}

	private registry: CloneHandler<unknown>[];
	private internalRegistry: CloneHandler<unknown>[] = [];

	public constructor() {
		this.registry = Cloner.registry;

		this.handleInternalRegistry();
	}

	private registerInternalHandler<T>(handler: CloneHandler<T>): void {
		this.registry.push(handler as CloneHandler<unknown>);
	}

	private handleInternalRegistry(): void {
		this.registerInternalHandler(STRING_CLONE_HANDLER);
		this.registerInternalHandler(NUMBER_CLONE_HANDLER);
		this.registerInternalHandler(BOOLEAN_CLONE_HANDLER);
		this.registerInternalHandler(NULL_CLONE_HANDLER);
		this.registerInternalHandler(UNDEFINED_CLONE_HANDLER);
		this.registerInternalHandler(SYMBOL_CLONE_HANDLER);
		this.registerInternalHandler(BIGINT_CLONE_HANDLER);

		this.registerInternalHandler(ARRAY_CLONE_HANDLER);
		this.registerInternalHandler(OBJECT_CLONE_HANDLER);

		this.registerInternalHandler(DATE_CLONE_HANDLER);
		this.registerInternalHandler(SET_CLONE_HANDLER);
		this.registerInternalHandler(MAP_CLONE_HANDLER);
		this.registerInternalHandler(REGEXP_CLONE_HANDLER);

		if (typeof Temporal !== "undefined") {
			for (const handler of TEMPORAL_HANDLERS) {
				this.registerInternalHandler(handler as CloneHandler<unknown>);
			}
		}
	}

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

			this.registry.push({
				checker: handlerOrChecker,
				clone,
			} as CloneHandler<unknown>);

			return;
		}

		this.registry.push(handlerOrChecker as CloneHandler<unknown>);
	}

	public clone<T>(this: Cloner, value: T): T {
		let hasCloned = false;
		let cloned: T = value;

		const handleHandler = (handler: CloneHandler<unknown>) => {
			if (handler.checker(value)) {
				cloned = handler.clone(value, this) as T;
				hasCloned = true;
			}
		};

		for (const handler of this.registry) {
			handleHandler(handler);

			if (hasCloned) {
				break;
			}
		}

		if (!hasCloned) {
			for (const handler of this.internalRegistry) {
				handleHandler(handler);

				if (hasCloned) {
					break;
				}
			}
		}

		return cloned;
	}
}
