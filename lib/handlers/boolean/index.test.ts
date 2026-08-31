import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

// NOTE: this test is flawed, there is no way to mutate a boolean itself so the reference cannot really be checked
describe("Boolean cloning", () => {
	test("Cloned boolean not connected to older boolean", () => {
		let value = false;
		const cloned = cloner.clone(value, true);

		value = true;

		expect(cloned).not.toBe(value);
	});
});
