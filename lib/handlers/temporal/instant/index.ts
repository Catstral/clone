import type { CloneHandler } from "~/cloner.ts";

export const TEMPORAL_INSTANT_CLONE_HANDLER = {
	checker: (v): v is Temporal.Instant => {
		if (typeof Temporal === "undefined" || typeof Temporal.Instant === "undefined") {
			return false;
		}

		return v instanceof Temporal.Instant;
	},
	clone: (v) => Temporal.Instant.from(v),
} satisfies CloneHandler<Temporal.Instant>;
