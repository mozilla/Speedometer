# ChatStream

An LLM chat client written in React: a sidebar of conversations, a message
list, and a composer, with assistant replies streamed in a few tokens at a time
and rendered as Markdown.

It is an original app and ships no third-party assets. It is adapted from the
`chat-stream` benchmark in the Octane repository, with Markdown replies, code
highlighting and scroll pinning added.

## What are we testing

-   Streaming: chunks append to the reply's text, and rendering re-parses the
    reply's Markdown. Unchanged blocks keep their identity across parses (the
    memoized-Markdown pattern streaming chat UIs use), so `memo` skips all but
    the blocks that grew.
-   Code blocks highlighted into one span per token, the way chat UIs' regex
    highlighters produce them.
-   Scroll pinning with CSS scroll anchoring: an anchor element after the
    messages (the list's only `overflow-anchor: auto` candidate) keeps the
    newest text in view as replies grow and conversations switch. The browser
    adjusts the scroll position during its own layout, so no script reads
    layout after a commit.
-   Mounting and unmounting whole conversations, up to 200 messages.
-   A controlled composer updated on every keystroke.

## How are we testing

All content comes from one fixed seed in `src/corpus.js`. There is no network,
storage, `Math.random` or `Date.now`, so every run renders the same
conversations and streams the same replies.

`src/network.js` stands in for a streaming fetch. Each `window.deliverChunk()`
call hands the open reply its next four tokens, so chunk arrival is
deterministic and needs no timers.

Like the React fixture of the ChatStreamUpstream suites (the chat-stream
benchmark in the Octane repository), the app commits every update with
`flushSync`: each send, chunk, conversation click and keystroke is on screen
before the step's next interaction. Both suites share the same step helpers
(`chatStreamHelpers` in `suites-experimental/suites.mjs`), and a step stops
delivering chunks once the reply loses its `streaming` class. No step yields
to the event loop before it ends, so every browser paints once per step.

-   `StreamReply1`, `StreamReply2`, `StreamReply3`: each sends a prompt in the
    first conversation and streams the reply to completion.
-   `SwitchConversations`: clicks every conversation in the sidebar, then returns
    to the first.
-   `StreamIntoLongConversation`: streams one reply at the end of the
    200-message conversation.
-   `TypePrompt`: types a 163-character prompt into the composer one character
    at a time.

The composer uses `onInput`: React's `onChange` drops an input event when a
script, like the benchmark, set the value.

## Developer Documentation

The app was created with Vite + React. It can be previewed during development
with `npm run dev`. To update the files run in the harness, run
`npm run build`, which regenerates the committed `dist/` directory and its
`resources.txt`.

The built workload can be loaded within the harness at e.g.
`http://localhost:8080/?developerMode&suites=ChatStream-React`.
