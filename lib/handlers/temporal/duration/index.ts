import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_DURATION_CLONE_HANDLER = {
	checker: (v): v is Temporal.Duration => {
		if (typeof Temporal === "undefined" || typeof Temporal.Duration === "undefined") {
			return false;
		}

		return v instanceof Temporal.Duration;
	},
	clone: (v) => Temporal.Duration.from(v),
} satisfies CloneHandler<Temporal.Duration>;
