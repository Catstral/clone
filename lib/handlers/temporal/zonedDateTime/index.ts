import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_ZONED_DATE_TIME_CLONE_HANDLER = {
	checker: (v): v is Temporal.ZonedDateTime => {
		if (typeof Temporal === "undefined" || typeof Temporal.ZonedDateTime === "undefined") {
			return false;
		}

		return v instanceof Temporal.ZonedDateTime;
	},
	clone: (v) => Temporal.ZonedDateTime.from(v),
} satisfies CloneHandler<Temporal.ZonedDateTime>;
