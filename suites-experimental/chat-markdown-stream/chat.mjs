// A chat UI in the style of LLM chat apps: every message is Markdown, rendered
// with marked, sanitized with DOMPurify and syntax-highlighted with Prism. A
// streamed answer is re-rendered as a whole on every chunk, and the message
// list sticks to the bottom while it grows.

import {
  answerFiles,
  conversations,
  messagesOf,
  streamedFile,
  streamedPrompt,
} from "./conversation.mjs";

// tests.mjs has one ReceiveChunk step per chunk.
const CHUNK_COUNT = 30;
const STICK_TO_BOTTOM_DISTANCE = 40;

const { marked, DOMPurify, Prism } = window;

const sidebar = document.getElementById("conversations");
const scroller = document.getElementById("scroller");
const messageList = document.getElementById("messages");
const composer = document.getElementById("composer");
const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");

let answers = [];
let streamedChunks = [];
let streaming = null;

const fetchText = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.text();
};

// Splits the answer into CHUNK_COUNT pieces at word boundaries, the way a
// server streams a few tokens at a time.
function splitIntoChunks(text, count) {
  const words = text.match(/\S+\s*/g);
  const perChunk = Math.ceil(words.length / count);
  return Array.from({ length: count }, (_, i) =>
    words.slice(i * perChunk, (i + 1) * perChunk).join(""),
  );
}

function renderMarkdown(body, markdown) {
  body.innerHTML = DOMPurify.sanitize(marked.parse(markdown));
  for (const pre of body.querySelectorAll("pre")) {
    const code = pre.querySelector("code");
    const language = code?.className.match(/language-(\S+)/)?.[1];
    if (language && Prism.languages[language]) {
      Prism.highlightElement(code);
    }
    const header = document.createElement("div");
    header.className = "code-header";
    const label = document.createElement("span");
    label.textContent = language ?? "text";
    const copy = document.createElement("button");
    copy.type = "button";
    copy.textContent = "Copy";
    copy.addEventListener("click", () =>
      navigator.clipboard?.writeText(code.textContent),
    );
    header.append(label, copy);
    pre.before(header);
  }
}

function createMessage(role) {
  const article = document.createElement("article");
  article.className = `message ${role}`;
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = role == "user" ? "You" : "AI";
  const body = document.createElement("div");
  body.className = "body";
  article.append(avatar, body);
  return article;
}

function addActions(article) {
  const actions = document.createElement("footer");
  actions.className = "actions";
  for (const label of ["Copy", "Regenerate", "Good response", "Bad response"]) {
    const button = document.createElement("button");
    button.type = "button";
    button.title = label;
    button.textContent = label;
    actions.append(button);
  }
  article.append(actions);
}

function appendMessage({ role, markdown }) {
  const article = createMessage(role);
  if (role == "user") {
    article.querySelector(".body").textContent = markdown;
  } else {
    renderMarkdown(article.querySelector(".body"), markdown);
    addActions(article);
  }
  messageList.append(article);
  return article;
}

const isNearBottom = () =>
  scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight <
  STICK_TO_BOTTOM_DISTANCE;

const scrollToBottom = () => {
  scroller.scrollTop = scroller.scrollHeight;
};

function renderSidebar() {
  sidebar.replaceChildren(
    ...conversations.map((conversation, index) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.index = index;
      button.textContent = conversation.title;
      li.append(button);
      return li;
    }),
  );
}

function openConversation(index) {
  for (const button of sidebar.querySelectorAll("button")) {
    button.ariaCurrent = button.dataset.index == index ? "page" : null;
  }
  messageList.replaceChildren();
  for (const message of messagesOf(conversations[index], answers)) {
    appendMessage(message);
  }
  scrollToBottom();
}

function autoGrow() {
  promptInput.style.height = "auto";
  promptInput.style.height = `${promptInput.scrollHeight}px`;
}

function send() {
  const text = promptInput.value.trim();
  if (!text || streaming) {
    return;
  }
  appendMessage({ role: "user", markdown: text });
  promptInput.value = "";
  autoGrow();
  sendButton.disabled = true;
  const article = createMessage("assistant");
  article.classList.add("streaming");
  messageList.append(article);
  streaming = { article, markdown: "", next: 0 };
  scrollToBottom();
  // Outside the runner, the steps don't deliver the chunks, so simulate a
  // server that sends one every 50 ms.
  if (window.parent == window) {
    streamLive();
  }
}

function streamLive() {
  setTimeout(() => {
    if (streaming.next < streamedChunks.length) {
      receiveChunk();
      streamLive();
    } else {
      finishResponse();
    }
  }, 50);
}

// Called for every chunk the server sends.
function receiveChunk() {
  const stickToBottom = isNearBottom();
  streaming.markdown += streamedChunks[streaming.next++];
  renderMarkdown(streaming.article.querySelector(".body"), streaming.markdown);
  if (stickToBottom) {
    scrollToBottom();
  }
}

function finishResponse() {
  const stickToBottom = isNearBottom();
  streaming.article.classList.remove("streaming");
  renderMarkdown(streaming.article.querySelector(".body"), streaming.markdown);
  addActions(streaming.article);
  streaming = null;
  sendButton.disabled = false;
  if (stickToBottom) {
    scrollToBottom();
  }
}

sidebar.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (button) {
    openConversation(Number(button.dataset.index));
  }
});
promptInput.addEventListener("input", autoGrow);
promptInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && !event.shiftKey) {
    event.preventDefault();
    send();
  }
});
composer.addEventListener("submit", (event) => {
  event.preventDefault();
  send();
});

const ready = (async () => {
  let streamedAnswer;
  [answers, streamedAnswer] = await Promise.all([
    Promise.all(answerFiles.map(fetchText)),
    fetchText(streamedFile),
  ]);
  streamedChunks = splitIntoChunks(streamedAnswer, CHUNK_COUNT);
  renderSidebar();
  document.body.classList.add("ready");
})();

// Functions for the benchmark steps (see tests.mjs).
window.whenReady = () => ready;
window.typePrompt = () => {
  promptInput.focus();
  promptInput.value = streamedPrompt;
  promptInput.dispatchEvent(new Event("input", { bubbles: true }));
};
window.receiveChunk = receiveChunk;
window.finishResponse = finishResponse;
window.scrollToTop = () => {
  scroller.scrollTop = 0;
};
