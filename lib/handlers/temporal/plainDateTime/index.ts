import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_PLAIN_DATE_TIME_CLONE_HANDLER = {
	checker: (v): v is Temporal.PlainDateTime => {
		if (typeof Temporal === "undefined" || typeof Temporal.PlainDateTime === "undefined") {
			return false;
		}

		return v instanceof Temporal.PlainDateTime;
	},
	clone: (v) => Temporal.PlainDateTime.from(v),
} satisfies CloneHandler<Temporal.PlainDateTime>;
