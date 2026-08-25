import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_PLAIN_DATE_CLONE_HANDLER = {
	checker: (v): v is Temporal.PlainDate => {
		if (typeof Temporal === "undefined" || typeof Temporal.PlainDate === "undefined") {
			return false;
		}

		return v instanceof Temporal.PlainDate;
	},
	clone: (v) => Temporal.PlainDate.from(v),
} satisfies CloneHandler<Temporal.PlainDate>;
