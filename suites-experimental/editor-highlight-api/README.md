# Editor-HighlightAPI

Syntax highlighting of large source files with [Prism](https://prismjs.com/)'s
tokenizer and the [CSS Custom Highlight API](https://drafts.csswg.org/css-highlight-api-1/),
based on Bramus Van Damme's proof of concept:

- Article: <https://www.bram.us/2024/02/18/custom-highlight-api-for-syntax-highlighting/>
- CodePen: <https://codepen.io/bramus/pen/VwRqGVo> (static blocks),
  <https://codepen.io/bramus/pen/MWxLjEo> (`contenteditable`)

Classic highlighters wrap every token in a `<span>`. Here, the code stays one
text node. Each token becomes a `Range` over that text node. Each range goes
into the `Highlight` for its token type (`keyword`, `string`, ...), and the
page styles those highlights with `::highlight(<type>)` rules.

## Why this is interesting for Speedometer

The page does very little DOM work, so the cost is in engine paths that
Speedometer does not cover today:

- creating and registering tens of thousands of `Range` objects in
  `Highlight` sets (`HighlightRegistry`, live range bookkeeping on the text
  node),
- style resolution and painting of `::highlight()` pseudo-elements across one
  very large text node,
- editing: every keystroke in the `contenteditable` block clears all
  highlights and repaints them, and each text change updates all live ranges.

## Usage

The page loads samples with `fetch()`, so serve it over HTTP:

```sh
python3 -m http.server
```

Then open <http://localhost:8000/suites-experimental/editor-highlight-api/>. Pick a sample, click
**Insert**. The page shows the character count, the number of ranges, and
these timings:

- **layout**: the page inserts the text and waits one frame, so the text is
  laid out before any highlight exists. The CodePen usually runs in this
  order when you paste code: the paste happens on `keydown`, and the `keyup`
  handler adds the highlights in a later event, normally after a layout.
- **tokenize**: `Prism.tokenize()`.
- **highlight**: clearing all highlights, then creating and adding the ranges.
- **paint**: from the end of *highlight* until a timer queued from the next
  `requestAnimationFrame` fires. This is the same end marker that
  Speedometer's default step scheduler uses. It covers style, layout and
  paint of the frame.

With **Highlight before first layout** checked, the page adds the highlights
in the same task that inserts the text. There is no *layout* timing then:
the first layout of the text happens in *paint*, with all ranges present.

The code block is editable. Each edit re-highlights the whole block. Use
**Re-highlight** to measure a pass without changing the text.

## Steps

The suite is defined in `suites.mjs`. Its `prepare`
loads all samples, so no step fetches anything. Each step waits until the
editor has highlighted and painted.

| Step | Action |
| --- | --- |
| `OpenJQuery` | Insert jQuery (285 KB, about 36,000 ranges): lay out the text, then tokenize and highlight it |
| `TypeCharacter1` … `TypeCharacter5` | Type one character at the start of the file (`execCommand("insertText")`). Each keystroke re-highlights the whole file |
| `ScrollToEnd` | Scroll the code block to the end, which paints text that was not painted before |
| `OpenBootstrap` | Insert Bootstrap CSS (281 KB, about 33,000 ranges) |

The page provides `preloadSamples()`, `typeCharacter()`, `scrollToEnd()`
and `whenIdle()` on `window` for these steps.

## Samples

| Sample | Language | Size |
| --- | --- | --- |
| Inline snippet | JS | < 1 KB |
| Inline snippet | CSS | < 1 KB |
| `samples/normalize-8.0.1.css` | CSS | 6 KB |
| `samples/preact-10.24.3-diff.js` | JS | 18 KB |
| `samples/underscore-1.13.7.js` | JS | 69 KB |
| `samples/bootstrap-5.3.3.css` | CSS | 281 KB |
| `samples/jquery-3.7.1.js` | JS | 285 KB |
| `samples/d3-7.9.0.js` | JS | 587 KB |

All files are unmodified copies from npm (via unpkg), under their own licenses.
`lib/prism.js` is Prism 1.30.0 (`prismjs/prism.js`), which contains the
markup, CSS, C-like and JavaScript grammars.

## Differences from the CodePen

- `paintTokenHighlights` recurses into nested tokens (for example, template
  string interpolations and CSS selector parts). The original paints only
  top-level tokens.
- The Tab key inserts text with `insertText` instead of `insertHTML`.
- The page has the sample picker, the timing readout and the
  **Highlight before first layout** option.

## Open questions for a Speedometer workload

- Order: an editor that opens a file and highlights it in the same task lays
  out the text with all ranges present (**Highlight before first layout**).
  In Firefox, that is much slower than laying out the text first, so the
  steps lay out first. Decide whether the suite should cover the other order
  too.
- Size: the steps use jQuery and Bootstrap. At D3 size, the first paint in
  Chromium takes seconds.
- Typing: real editors re-tokenize only the changed region. Re-highlighting
  the whole file on each keystroke follows the CodePen, and makes typing the
  heaviest part of the suite.
