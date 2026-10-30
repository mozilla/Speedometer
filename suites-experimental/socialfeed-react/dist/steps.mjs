// The benchmark steps, in journey order. Each one clicks or types into the
// page's real controls and resolves once the app has settled: after the
// event that marks the end of the interaction, and after the page is idle
// (no replayed response chunks, no React work, logging and visual
// completion flushed).
import { feedSteps } from "./steps/feed.mjs";
import { dialogSteps } from "./steps/dialog.mjs";
import { searchSteps } from "./steps/search.mjs";
import { profileSteps } from "./steps/profile.mjs";

export const steps = [...feedSteps, ...dialogSteps, ...searchSteps, ...profileSteps];
