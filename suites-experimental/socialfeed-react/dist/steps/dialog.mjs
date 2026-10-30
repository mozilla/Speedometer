// The post dialog: open it, expand replies, change the comment order, load
// more comments, type a comment, close it.
import { COMMENT_AFTER_MENTION, COMMENT_BEFORE_MENTION, COMMENT_MENTION_QUERY, DIALOG_STORY_POSITION, NEWEST_ORDER, REPLY_THREADS } from "../journey.mjs";
import { click, find, pressKey, scrollToFeedUnit, waitForElement } from "./helpers.mjs";

function dialog() {
    return find('[data-testid="post-dialog"]');
}

async function typeCharacters(w, text) {
    for (const ch of text) {
        document.execCommand("insertText", false, ch);
        await w.whenIdle();
    }
}

export const dialogSteps = [
    {
        name: "OpenPostDialog",
        async run(w) {
            const story = find('[data-testid="feed-story"]', await scrollToFeedUnit(w, DIALOG_STORY_POSITION));
            const done = w.nextEvent("dialog-ready");
            find('[data-testid="ufi-comment"]', story).click();
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "ExpandReplies",
        async run(w) {
            for (const { commentId } of REPLY_THREADS) {
                const button = find(`[data-comment-id="${commentId}"] [data-testid="view-replies"]`, dialog());
                const done = w.nextEvent("replies-loaded");
                button.click();
                await done;
                await w.whenIdle();
            }
        },
    },
    {
        name: "ChangeCommentOrder",
        async run(w) {
            await click(w, find('[data-testid="comment-order-trigger"]', dialog()));
            const done = w.nextEvent("comments-reordered");
            find(`[data-testid="comment-order-${NEWEST_ORDER}"]`).click();
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "LoadMoreComments",
        async run(w) {
            const body = find('[data-testid="post-dialog-body"]', dialog());
            const done = w.nextEvent("comments-page-loaded");
            body.scrollTop = body.scrollHeight;
            await done;
            await w.whenIdle();
        },
    },
    {
        name: "TypeComment",
        async run(w) {
            const input = find('[data-testid="comment-composer-input"]', dialog());
            input.focus();
            await w.whenIdle();
            await typeCharacters(w, COMMENT_BEFORE_MENTION);
            const results = w.nextEvent("mentions-results");
            await typeCharacters(w, `@${COMMENT_MENTION_QUERY}`);
            await results;
            await waitForElement(w, '[data-testid="mentions-menu"] [role="option"]');
            pressKey(input, "Enter");
            await w.whenIdle();
            await typeCharacters(w, COMMENT_AFTER_MENTION);
            if (!input.querySelector("[data-mention]"))
                throw new Error("The mention wasn't inserted");
            document.execCommand("selectAll");
            document.execCommand("delete");
            await w.whenIdle();
        },
    },
    {
        name: "ClosePostDialog",
        async run(w) {
            const done = w.nextEvent("dialog-closed");
            find('[data-testid="post-dialog-close"]', dialog()).click();
            await done;
            await w.whenIdle();
        },
    },
];
