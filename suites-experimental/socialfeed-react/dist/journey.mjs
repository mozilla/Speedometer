// The benchmark journey, shared by the build (which prepares a response for
// every state the journey reaches) and the benchmark steps (which click
// through it).

export const HOME_FEED_INITIAL_COUNT = 3;
export const FEED_PAGE_SIZE = 12;
// Pages the LoadMoreStories step loads.
export const FEED_PAGES = 2;
// The stories whose "See more" the ExpandStoryText step clicks, by position
// in the feed (the build checks that their texts are truncated); it then
// opens the reactions dock on the first one.
export const SEE_MORE_POSITIONS = [16, 22, 25];

// The post the OpenPostDialog step opens (the feed's eighth story, 271
// comments), the comments whose replies ExpandReplies loads, and their reply
// counts.
export const DIALOG_STORY_POSITION = 7;
export const DIALOG_STORY_ID = "s8";
export const COMMENT_PAGE_SIZE = 10;
export const REPLY_THREADS = [
    { commentId: "c48", replies: 30 },
    { commentId: "c46", replies: 6 },
];
export const NEWEST_ORDER = "RECENT_ACTIVITY";
// What TypeComment types: text, then a mention (the typeahead opens on "@"
// and Enter picks the first person), then more text with an emoticon and a
// hashtag. The editor is cleared afterwards; nothing is sent.
export const COMMENT_BEFORE_MENTION = "Nice! ";
export const COMMENT_MENTION_QUERY = "Mou";
export const COMMENT_AFTER_MENTION = " so good :) #weekend";

// The viewer's profile, which NavigateToProfile opens from the left rail.
export const VIEWER_PROFILE_PATH = "/shunair.ziobotte";
export const VIEWER_VANITY = "shunair.ziobotte";
export const PROFILE_TIMELINE_INITIAL_COUNT = 3;
export const PROFILE_TIMELINE_PAGE_SIZE = 6;

// The text the SearchTypeahead step types, one character at a time.
export const SEARCH_TEXT = "steachu";
// The header menus the OpenHeaderMenus step opens, in order: the button's
// test id and the query the panel runs.
export const HEADER_MENUS = [
    { name: "notifications", button: "notifications-button", query: "NotificationsPanelQuery" },
    { name: "messenger", button: "messenger-button", query: "MessengerPanelQuery" },
    { name: "account", button: "account-button", query: "AccountMenuPanelQuery" },
];
