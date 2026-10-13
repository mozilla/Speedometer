// The steps of the YouTube-like workload, shared by page/workload-test.mjs
// (Speedometer) and tools/verify.mjs. Each step performs a user action through
// the DOM in act() and names the app event that signals the resulting
// response was handled; targetIds (an array, or a function called before act())
// restricts that event to those targets.
const QUERY = "firefox vs chrome";

export default [
  { name: "LoadSearchResults", event: "ytl-navigate-finish", act: () => {
    const input = document.querySelector("input[name=search_query]");
    input.value = QUERY;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    document.querySelector(".ytlSearchboxComponentSearchButton").click();
  } },
  { name: "LoadMoreSearchResults1", event: "ytl-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "LoadMoreSearchResults2", event: "ytl-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "ApplySearchFilter", event: "ytl-reload-applied", act: () => {
    window.scrollTo(0, 0);
    const chips = [...document.querySelectorAll("ytl-chip-cloud-chip-renderer")];
    chips.find((c) => !c.selected).click();
  } },
  { name: "NavigateToWatch", event: "ytl-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    const video = document.querySelector("ytl-search ytl-video-renderer");
    video.querySelector("#meta").click();
  } },
  { name: "LoadComments", event: "ytl-reload-applied", targetIds: ["comments-section"], act: () => document.querySelector("ytl-watch-flexy:not([hidden]) ytl-comments#comments").scrollIntoView() },
  { name: "LoadMoreComments", event: "ytl-continuation-applied", targetIds: () => document.querySelector("ytl-watch-flexy:not([hidden])").hasAttribute("is-two-columns_") ? ["comments-section", "watch-next-feed"] : ["comments-section"], act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
  { name: "NavigateToRelatedVideo", event: "ytl-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    document.querySelector("ytl-watch-flexy:not([hidden]) #related ytl-lockup-view-model a[href^='/watch']").click();
  } },
  { name: "NavigateBack", event: "ytl-navigate-finish", act: () => history.back() },
  { name: "NavigateToChannel", event: "ytl-navigate-finish", act: () => {
    window.scrollTo(0, 0);
    document.querySelector("ytl-watch-flexy:not([hidden]) ytl-video-owner-renderer a.ytl-simple-endpoint").click();
  } },
  { name: "NavigateToChannelVideos", event: "ytl-navigate-finish", act: () => {
    const tabs = document.querySelectorAll("ytl-browse:not([hidden]) ytl-tab-shape");
    [...tabs].find((t) => t.getAttribute("tab-title") === "Videos").click();
  } },
  { name: "LoadMoreGrid", event: "ytl-continuation-applied", act: () => window.scrollTo(0, document.documentElement.scrollHeight) },
];
