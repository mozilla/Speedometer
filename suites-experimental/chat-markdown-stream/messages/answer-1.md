You can get a responsive card grid without a single media query by letting **CSS Grid** decide how many columns fit:

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #d0d7de;
  border-radius: 0.5rem;
  overflow: hidden;
}

.card img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
}
```

How it works:

1. `minmax(16rem, 1fr)` says every column is at least `16rem` wide and shares the leftover space equally.
2. `auto-fill` creates as many columns as fit into the container.
3. When the container shrinks below two columns' worth of space, the grid wraps to one column automatically.

If you want the cards to stretch when there are only a few of them, use `auto-fit` instead of `auto-fill`. The difference:

| Keyword | Empty tracks | Few items |
| --- | --- | --- |
| `auto-fill` | Kept | Items keep their minimum width |
| `auto-fit` | Collapsed | Items grow to fill the row |

The markup stays simple:

```html
<ul class="cards">
  <li class="card">
    <img src="lake.jpg" alt="A lake at dawn">
    <h3>Lake trail</h3>
    <p>An easy 5 km loop with two viewpoints.</p>
  </li>
</ul>
```

> Tip: give the card an explicit `min-width: 0` if long words or code inside it make the grid overflow.
