import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("Number cloning", () => {
	test("Cloned number not connected to older number", () => {
		let value = 0;
		const cloned = cloner.clone(value, true);

		value += 1;

		expect(cloned).not.toBe(value);
	});
});
