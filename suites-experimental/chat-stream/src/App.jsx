import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { initialConversations, nextReply, userMessage } from "./corpus.js";
import { parseMarkdown } from "./markdown.js";
import { streamReply } from "./network.js";

// Replaces one message of one conversation, sharing everything else.
function updateMessage(conversations, conversationId, messageId, update) {
    return conversations.map((conversation) => conversation.id === conversationId ? { ...conversation, messages: conversation.messages.map((message) => message.id === messageId ? update(message) : message) } : conversation);
}

// Every update commits synchronously through flushSync, like the React app in
// the Octane repository's chat-stream benchmark: each send, chunk, click and
// keystroke is on screen before the benchmark's next interaction.
export default function App() {
    const [conversations, setConversations] = useState(initialConversations);
    const [activeId, setActiveId] = useState(0);
    const [draft, setDraft] = useState("");
    const [streamingId, setStreamingId] = useState(null);

    const active = conversations[activeId];

    const send = () => {
        const text = draft.trim();
        if (text === "" || streamingId !== null)
            return;
        const conversationId = activeId;
        const reply = nextReply();
        const replyId = reply.message.id;
        flushSync(() => {
            setConversations((current) => current.map((conversation) => conversation.id === conversationId ? { ...conversation, messages: [...conversation.messages, userMessage(text), reply.message] } : conversation));
            setStreamingId(replyId);
            setDraft("");
        });
        // A chunk arrives outside any event, so flushSync is what renders it
        // right away; the last chunk also ends the stream, in the same commit.
        streamReply(reply.text, (chunk, done) =>
            flushSync(() => {
                setConversations((current) => updateMessage(current, conversationId, replyId, (message) => ({ ...message, text: message.text + chunk })));
                if (done)
                    setStreamingId(null);
            })
        );
    };

    return (
        <div className="app">
            <aside className="sidebar">
                <div className="sidebar-heading">Chats</div>
                <nav className="conversation-list">
                    {conversations.map((conversation) =>
                        <ConversationItem key={conversation.id} id={conversation.id} title={conversation.title} active={conversation.id === activeId} onSelect={setActiveId} />
                    )}
                </nav>
            </aside>
            <main className="chat">
                <header className="chat-header">
                    <h1>{active.title}</h1>
                    <span className="message-count">{active.messages.length} messages</span>
                </header>
                <MessageList messages={active.messages} streamingId={streamingId} />
                <footer className="composer">
                    <div className="composer-box">
                        <textarea
                            className="prompt"
                            placeholder="Ask anything"
                            value={draft}
                            // onInput rather than onChange: React's onChange skips an
                            // input event when the value was set by script, as the
                            // benchmark sets it.
                            onInput={(event) => flushSync(() => setDraft(event.target.value))}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" && !event.shiftKey) {
                                    event.preventDefault();
                                    send();
                                }
                            }}
                        />
                        <button className="send" disabled={draft.trim() === "" || streamingId !== null} onClick={send}>
                            Send
                        </button>
                    </div>
                    <div className="composer-hint">Enter to send, Shift+Enter for a new line</div>
                </footer>
            </main>
        </div>
    );
}

const ConversationItem = memo(function ConversationItem({ id, title, active, onSelect }) {
    return (
        <button className={active ? "conversation-item active" : "conversation-item"} data-conversation={id} onClick={() => flushSync(() => onSelect(id))}>
            {title}
        </button>
    );
});

// Keeps the newest message in view with CSS scroll anchoring rather than
// script: .scroll-anchor is the list's only anchor candidate, so once the list
// is at the bottom, the browser keeps it there as messages arrive, replies
// grow and conversations switch, adjusting the scroll position during its own
// layout instead of a layout forced by reading scrollHeight after every
// commit. Only the first position is set by script, once, on mount.
function MessageList({ messages, streamingId }) {
    const scroller = useRef(null);
    useLayoutEffect(() => {
        const element = scroller.current;
        element.scrollTop = element.scrollHeight;
    }, []);
    return (
        <div className="messages" ref={scroller}>
            <div className="messages-inner">
                {messages.map((message) =>
                    <Message key={message.id} message={message} streaming={message.id === streamingId} />
                )}
            </div>
            <div className="scroll-anchor" />
        </div>
    );
}

const Message = memo(function Message({ message, streaming }) {
    const isUser = message.role === "user";
    return (
        <article className={`message ${message.role}${streaming ? " streaming" : ""}`}>
            <div className="avatar">{isUser ? "You" : "AI"}</div>
            <div className="message-body">
                <div className="message-author">{isUser ? "You" : "Assistant"}</div>
                {isUser ? <p className="user-text">{message.text}</p> : message.text === "" ? <p className="thinking">Thinking…</p> : <Markdown text={message.text} />}
                {!isUser && !streaming
                    ? <div className="message-actions">
                        <button>Copy</button>
                        <button>Retry</button>
                        <button>Good</button>
                        <button>Bad</button>
                    </div>
                    : null}
            </div>
        </article>
    );
});

function Markdown({ text }) {
    const previous = useRef(undefined);
    // Reparsing reuses every block of the previous parse whose source is
    // unchanged, so memo(Block) skips all but the one still streaming.
    const blocks = useMemo(() => {
        const parsed = parseMarkdown(text, previous.current);
        previous.current = parsed;
        return parsed;
    }, [text]);
    return (
        <div className="markdown">
            {blocks.map((block) =>
                <Block key={block.id} block={block} />
            )}
        </div>
    );
}

const Block = memo(function Block({ block }) {
    switch (block.type) {
        case "heading":
            return (
                <h3>
                    <Inlines inlines={block.inlines} />
                </h3>
            );
        case "list": {
            const items = block.items.map((item) =>
                <li key={item.id}>
                    <Inlines inlines={item.inlines} />
                </li>
            );
            return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
        }
        case "code":
            return <CodeBlock lang={block.lang} lines={block.lines} />;
        default:
            return (
                <p>
                    <Inlines inlines={block.inlines} />
                </p>
            );
    }
});

function Inlines({ inlines }) {
    return inlines.map((inline) => {
        switch (inline.kind) {
            case "strong":
                return <strong key={inline.id}>{inline.text}</strong>;
            case "em":
                return <em key={inline.id}>{inline.text}</em>;
            case "code":
                return (
                    <code key={inline.id} className="inline-code">
                        {inline.text}
                    </code>
                );
            default:
                return <span key={inline.id}>{inline.text}</span>;
        }
    });
}

function CodeBlock({ lang, lines }) {
    return (
        <div className="code-block">
            <div className="code-header">
                <span>{lang || "text"}</span>
                <button>Copy code</button>
            </div>
            <pre>
                <code>
                    {lines.map((line) =>
                        <span key={line.id} className="line">
                            {line.tokens.map((token) =>
                                <span key={token.id} className={`tok-${token.kind}`}>
                                    {token.text}
                                </span>
                            )}
                        </span>
                    )}
                </code>
            </pre>
        </div>
    );
}
