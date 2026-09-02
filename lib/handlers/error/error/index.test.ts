import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("Error cloning", () => {
	test("Cloned Error not be same instance as older Error", () => {
		const value = new Error("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(Error);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
