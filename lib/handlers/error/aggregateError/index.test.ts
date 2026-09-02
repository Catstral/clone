import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("AggregateError cloning", () => {
	test("Cloned Error not be same instance as older Error", () => {
		const value = new AggregateError(["foo", "bar"], "foo");
		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(AggregateError);
		expect(cloned).not.toBe(value);
		expect(cloned.errors).toEqual(value.errors);
		expect(cloned.message).toBe(value.message);
		expect(cloned.name).toBe(value.name);
		expect(cloned.stack).toBe(value.stack);
	});
});
