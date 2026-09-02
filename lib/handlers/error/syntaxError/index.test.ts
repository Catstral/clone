import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("SyntaxError cloning", () => {
	test("Cloned SyntaxError not be same instance as older SyntaxError", () => {
		const value = new SyntaxError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(SyntaxError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
