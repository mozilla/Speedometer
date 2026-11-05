// The feed: render the home page, load more stories, expand story texts.
import { FEED_PAGES, SEE_MORE_POSITIONS } from "../journey.mjs";
import { click, find, hover, scrollToFeedUnit, settleFeed, unhover } from "./helpers.mjs";

export const feedSteps = [
    {
        name: "RenderHomeFeed",
        async run(w) {
            const done = w.nextEvent("home-feed-rendered");
            w.render();
            await done;
            await w.whenIdle();
            await settleFeed(w);
        },
    },
    {
        name: "LoadMoreStories",
        async run(w) {
            for (let page = 0; page < FEED_PAGES; page++) {
                const done = w.nextEvent("feed-page-loaded");
                find('[data-testid="feed-sentinel"]').scrollIntoView({ block: "end" });
                await done;
                await w.whenIdle();
                await settleFeed(w);
            }
        },
    },
    {
        name: "ExpandStoryText",
        async run(w) {
            for (const position of SEE_MORE_POSITIONS) {
                const unit = await scrollToFeedUnit(w, position);
                await click(w, find('[data-testid="see-more"]', unit));
            }
            // The reactions dock, whose hover-intent timer the step flushes.
            const story = find('[data-testid="feed-story"]', await scrollToFeedUnit(w, SEE_MORE_POSITIONS[0]));
            const like = find('[data-testid="ufi-like"]', story).parentElement;
            hover(like);
            w.flushDeferred();
            await w.whenIdle();
            find('[data-testid="reactions-dock"]', story);
            unhover(like);
            await w.whenIdle();
        },
    },
];
