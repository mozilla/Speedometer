# Chat-MarkdownStream

A chat app in the style of LLM chat UIs. Every assistant message is
Markdown, rendered with [marked](https://marked.js.org/), sanitized with
[DOMPurify](https://github.com/cure53/DOMPurify) and syntax-highlighted with
[Prism](https://prismjs.com/). The answer to the new prompt streams in
chunks, and the message list sticks to the bottom while it grows.

## Why this is interesting for Speedometer

Streaming chat is one of the most used web UIs today. Its rendering loop is
different from anything in Speedometer 3:

- **Re-rendering a growing subtree.** Many chat UIs render the whole message
  on every chunk: parse all the Markdown so far, sanitize the HTML, replace the
  message's children and highlight its code blocks again. The cost of a chunk
  grows with the length of the answer, so the late chunks matter most.
- **HTML parsing in several forms.** DOMPurify parses the HTML from marked
  into an inert document, walks and cleans it, and serializes it. The app then
  parses that string again with `innerHTML`. Prism builds the token `<span>`s
  of every code block through `innerHTML` too. The fragments contain
  character references (`&lt;`, `&quot;`) and thousands of short elements.
- **Forced layout from scrolling.** Before each chunk, the app reads
  `scrollHeight`, `scrollTop` and `clientHeight` to decide whether the user is
  at the bottom. After it, it sets `scrollTop`. Both force layout of a long,
  text-heavy document with tables and `<pre>` blocks.
- **Opening a conversation** renders 24 messages at once: a large burst of
  Markdown, sanitizing, parsing, highlighting and text layout.

## The app

- `index.html`: the layout (conversation sidebar, message list, composer)
  and the styles, including Prism's default theme.
- `chat.mjs`: rendering, streaming and scrolling. `renderMarkdown()` is the
  common pattern `body.innerHTML = DOMPurify.sanitize(marked.parse(markdown))`,
  followed by `Prism.highlightElement()` and a header with a **Copy** button
  for every code block.
- `conversation.mjs`: the conversations. Each one cycles through five
  question and answer pairs (`messages/answer-*.md`).
- `messages/streamed.md`: the streamed answer, about 7 KB of Markdown with
  headings, lists, tables, a blockquote, and JavaScript, CSS and HTML code.
- `lib/`: marked 16.4.1 (`lib/marked.umd.js`), DOMPurify 3.3.0
  (`dist/purify.min.js`) and Prism 1.30.0 (`prism.js`, same file as in
  `editor-highlight-api`). There is no build step.

Outside the runner, sending a message streams the canned answer with one
chunk every 50 ms, so the page can be tried by hand.

## Usage

Serve the repository over HTTP (`fetch()` and ES modules do not work from
`file://`):

```sh
python3 -m http.server
```

- Chat: <http://localhost:8000/suites-experimental/chat-markdown-stream/>
- Runner: run the `Chat-MarkdownStream` suite from Speedometer's experimental suites.

## Steps

The app fetches all Markdown in `prepare`, so no step touches the network.

| Step | Action |
| --- | --- |
| `OpenConversation` | Open "Frontend questions": render 24 messages and scroll to the bottom |
| `TypePrompt` | Type the prompt. The textarea grows to fit (`style.height` from `scrollHeight`) |
| `SendPrompt` | Click **Send**: add the user message and an empty, streaming assistant message |
| `ReceiveChunk1` … `ReceiveChunk30` | Receive 1/30 of the answer and re-render the whole message |
| `FinishResponse` | Render the final message and add its action buttons |
| `ScrollToTop` | Scroll to the start of the conversation, which paints messages not painted before |
| `OpenOtherConversation` | Open "Tooling and networking": replace the 26 messages with 16 others |

## Open questions for a Speedometer workload

- Rendering the whole message on every chunk is common, but not universal.
  Apps built on React or Vue diff the Markdown AST instead, and some append
  only the new text and re-render on block boundaries. A variant suite could
  cover one of those.
- Thirty chunks for a 7 KB answer are much bigger than real ones, which
  carry a few tokens every few tens of milliseconds. More, smaller chunks
  would be more realistic and would weight the late chunks even more.
