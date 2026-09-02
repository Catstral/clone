import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";
import { ClonerError } from "../../../error";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("ClonerError cloning", () => {
	test("Cloned ClonerError not be the same instance as older ClonerError", () => {
		const value = new ClonerError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(ClonerError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
