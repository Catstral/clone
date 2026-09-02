import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("RangeError cloning", () => {
	test("Cloned RangeError not be same instance as older RangeError", () => {
		const value = new RangeError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(RangeError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
