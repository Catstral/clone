import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_PLAIN_YEAR_MONTH_CLONE_HANDLER = {
	checker: (v): v is Temporal.PlainYearMonth => {
		if (typeof Temporal === "undefined" || typeof Temporal.PlainYearMonth === "undefined") {
			return false;
		}

		return v instanceof Temporal.PlainYearMonth;
	},
	clone: (v) => Temporal.PlainYearMonth.from(v),
} satisfies CloneHandler<Temporal.PlainYearMonth>;
