import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("SuppressedError cloning", () => {
	test("Cloned SuppressedError not be same instance as older SuppressedError", () => {
		const value = new SuppressedError("failure", "suppression", "foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(SuppressedError);
		expect(cloned).not.toBe(value);
		expect(cloned.error).toBe(value.error);
		expect(cloned.suppressed).toBe(value.suppressed);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
