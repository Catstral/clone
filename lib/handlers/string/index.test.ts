import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("String cloning", () => {
	test("Cloned string not connected to older string", () => {
		let value = "foo";
		const cloned = cloner.clone(value, true);

		value += "bar";

		expect(cloned).not.toBe(value);
	});
});
