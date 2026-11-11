// The lite variant's journey (docs/lite.md): the full journey's states and
// choices, with a shorter results page, the filter groups the journey uses,
// and fewer searches.
import { INITIAL_SEARCH as FULL_INITIAL_SEARCH } from "./journey.mjs";

export * from "./journey.mjs";

export const INITIAL_SEARCH = { ...FULL_INITIAL_SEARCH, rowsPerPage: 8 };

// The filter groups of the results page: the ones the journey and the
// popular filters refer to.
export const FILTER_FIELDS = ["price", "popular", "review_score", "class", "meal", "ht_id", "hotelfacility", "distance", "fc"];

// The searches the steps make, in order (scripts/build-responses.mjs).
export const SEARCHES = ["popular-filter", "sort", "destination"];

export const DESTINATION_TYPED = "Lo";
