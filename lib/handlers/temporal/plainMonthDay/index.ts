import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_PLAIN_MONTH_DAY_CLONE_HANDLER = {
	checker: (v): v is Temporal.PlainMonthDay => {
		if (typeof Temporal === "undefined" || typeof Temporal.PlainMonthDay === "undefined") {
			return false;
		}

		return v instanceof Temporal.PlainMonthDay;
	},
	clone: (v) => Temporal.PlainMonthDay.from(v),
} satisfies CloneHandler<Temporal.PlainMonthDay>;
