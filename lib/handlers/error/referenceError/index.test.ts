import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("ReferenceError cloning", () => {
	test("Cloned ReferenceError not be same instance as older ReferenceError", () => {
		const value = new ReferenceError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(ReferenceError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
