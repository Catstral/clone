import { beforeEach, describe, expect, test } from "bun:test";
import { Cloner } from "./cloner";

let cloner: Cloner;

beforeEach(() => {
	cloner = new Cloner();
});

describe("Cloner tests", () => {
	test("Custom clone handler", () => {
		class Foo {
			public foo: string = "bar";
		}

		cloner.registerHandler({
			id: "custom_foo_class",
			checker: (v) => v instanceof Foo,
			clone: (v) => {
				const cloned = new Foo();

				cloned.foo = v.foo;

				return cloned;
			},
		});

		const value = new Foo();

		value.foo = "foobar";

		const cloned = cloner.clone(value, true);

		expect(cloned).toBeInstanceOf(Foo);
		expect(cloned).not.toBe(value);
		expect(cloned.foo).toBe(value.foo);

		cloner.removeHandler("custom_foo_class");
	});
});
