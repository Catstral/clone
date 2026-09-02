import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("Cloner cloning", () => {
	test("Cloned Cloner not be the same instance of older cloner", () => {
		const value = new Cloner();
		const cloned = cloner.clone(value, true);

		expect(cloned).not.toBe(value);
	});
});
