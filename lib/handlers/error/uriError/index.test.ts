import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("URIError cloning", () => {
	test("Cloned URIError not be same instance as older URIError", () => {
		const value = new URIError("foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(URIError);
		expect(cloned).not.toBe(value);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
