// Navigating to the viewer's profile and back to the home feed.
import { find, click } from "./helpers.mjs";

export const profileSteps = [
    {
        name: "NavigateToProfile",
        async run(w) {
            const done = w.nextEvent("profile-rendered");
            await click(w, find('[data-testid="left-rail-viewer"]'));
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "BackToHomeFeed",
        async run(w) {
            const done = w.nextEvent("home-feed-rendered");
            history.back();
            await done;
            await w.whenIdle();
            if (!document.querySelector('[data-testid="feed-story"]'))
                throw new Error("The home feed shows no stories after going back");
        },
    },
];
