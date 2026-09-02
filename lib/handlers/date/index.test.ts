import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("Date cloning", () => {
	test("Cloned Date not connected to older Date", () => {
		const value = new Date("10-10-2000");
		const cloned = cloner.clone(value, true);

		expect(cloned).not.toBe(value);
		expect(cloned.valueOf()).toBe(value.valueOf());
		expect(cloned.toISOString()).toBe(value.toISOString());
	});
});
