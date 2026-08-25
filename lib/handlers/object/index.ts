import type { CloneHandler } from "~/cloner.ts";

// TODO: make

export const OBJECT_CLONE_HANDLER = {
	checker: (v): v is Record<string | number | symbol, unknown> => {
		if (!v) {
			return false;
		}

		if (typeof v !== "object") {
			return false;
		}

		return true;
	},
	clone: (v) => v,
} satisfies CloneHandler<Record<string | number | symbol, unknown>>;
