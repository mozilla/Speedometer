// The steps of the React version of the YouTube-like workload, shared by
// workload-test.mjs (Speedometer) and tools/verify.mjs. They have the same
// names and user actions as the realistic version's steps (yt-workload
// build/page/steps.mjs). Each step performs a user action through the DOM in
// act() and names the app event that signals that the resulting response was
// committed; targetIds (an array, or a function called before act())
// restricts that event to those targets.
//
// A page kept alive in a hidden <Activity> has an inline "display: none"
// style, so visible() selects the shown page without a style flush.
//
// Under Speedometer the app is served from a subdirectory, and router links
// include that base path, so link selectors match on a part of the href that
// doesn't depend on it, or on the renderer that contains the link.
const QUERY = "firefox vs chrome";
const visible = (page) => `[data-page=${page}]:not([style*="display: none"])`;

function setInputValue(input, value) {
  // React tracks the value of controlled inputs; only the native setter
  // makes the following input event reach onChange.
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

export default [
  { name: "LoadSearchResults", event: "ytr-navigate-finish", act: () => {
    setInputValue(document.querySelector("form[role=search] input[name=search_query]"), QUERY);
    document.querySelector("form[role=search] button[type=submit]").click();
  } },
  { name: "LoadMoreSearchResults1", event: "ytr-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "LoadMoreSearchResults2", event: "ytr-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "ApplySearchFilter", event: "ytr-reload-applied", act: () => {
    window.scrollTo(0, 0);
    document.querySelector(`${visible("search")} [data-chip][aria-pressed=false]`).click();
  } },
  { name: "NavigateToWatch", event: "ytr-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    document.querySelector(`${visible("search")} [data-renderer=videoRenderer] a[data-title-link]`).click();
  } },
  { name: "LoadComments", event: "ytr-reload-applied", targetIds: ["comments-section"], act: () => document.querySelector(`${visible("watch")} #comments`).scrollIntoView() },
  { name: "LoadMoreComments", event: "ytr-continuation-applied", targetIds: () => document.querySelector(visible("watch")).hasAttribute("data-two-columns") ? ["comments-section", "watch-next-feed"] : ["comments-section"], act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "NavigateToRelatedVideo", event: "ytr-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    document.querySelector(`${visible("watch")} #related [data-renderer=lockupViewModel] a[href*='/watch?v=']`).click();
  } },
  { name: "NavigateBack", event: "ytr-navigate-finish", act: () => history.back() },
  { name: "NavigateToChannel", event: "ytr-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    document.querySelector(`${visible("watch")} #owner [data-renderer=videoOwnerRenderer] a`).click();
  } },
  { name: "NavigateToChannelVideos", event: "ytr-navigate-finish", act: () => {
    const tabs = document.querySelectorAll(`${visible("channel")} nav a`);
    [...tabs].find((t) => t.textContent.trim() === "Videos").click();
  } },
  { name: "LoadMoreGrid", event: "ytr-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
];
