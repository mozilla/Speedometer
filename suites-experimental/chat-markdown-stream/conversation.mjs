// The canned conversations. Assistant answers are Markdown files in
// messages/; the app fetches them once at startup.

export const answerFiles = [
  "messages/answer-1.md",
  "messages/answer-2.md",
  "messages/answer-3.md",
  "messages/answer-4.md",
  "messages/answer-5.md",
];

export const streamedFile = "messages/streamed.md";

const prompts = [
  "How do I make a card grid responsive without media queries?",
  "Can you show me how to debounce a search input in plain JavaScript?",
  "What's the difference between `git merge` and `git rebase`, and when should I use which?",
  "Write a fetch wrapper that retries with exponential backoff.",
  "Why should I use a `<button>` instead of a clickable `<div>`?",
];

export const streamedPrompt =
  "Can you build me a sortable, filterable table component without a framework?";

// Each conversation cycles through the five question and answer pairs,
// starting at `offset`.
export const conversations = [
  { title: "Frontend questions", offset: 0, exchanges: 12 },
  { title: "Tooling and networking", offset: 2, exchanges: 8 },
  ...[
    "Trip planning",
    "Recipe ideas for the week",
    "Cover letter draft",
    "Explain quantum computing simply",
    "SQL index tuning",
    "Rust lifetimes",
    "Garden layout",
    "Birthday party games",
    "Regex for dates",
    "Docker compose setup",
    "Unit test naming",
    "CSS animations",
  ].map((title, i) => ({ title, offset: i % 5, exchanges: 2 })),
];

export function messagesOf(conversation, answers) {
  return Array.from({ length: conversation.exchanges }, (_, i) => {
    const n = (conversation.offset + i) % prompts.length;
    return [
      { role: "user", markdown: prompts[n] },
      { role: "assistant", markdown: answers[n] },
    ];
  }).flat();
}
