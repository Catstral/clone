import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "../../cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("BigInt cloning", () => {
	test("Cloned BigInt not connected to older BigInt", () => {
		let value = 0n;
		const cloned = cloner.clone(value, true);

		value += 1n;

		expect(cloned).not.toBe(value);
	});
});
