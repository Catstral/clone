import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_PLAIN_TIME_CLONE_HANDLER = {
	checker: (v): v is Temporal.PlainTime => {
		if (typeof Temporal === "undefined") {
			return false;
		}

		return v instanceof Temporal.PlainTime;
	},
	clone: (v) => Temporal.PlainTime.from(v),
} satisfies CloneHandler<Temporal.PlainTime>;
