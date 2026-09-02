import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("EvalError cloning", () => {
	test("Cloned EvalError not be same instance as older EvalError", () => {
		const value = new EvalError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(EvalError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
