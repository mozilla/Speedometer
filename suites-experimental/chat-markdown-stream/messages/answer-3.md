Both commands integrate the changes from one branch into another. They differ in the history they leave behind.

### Merge

```bash
git switch feature
git merge main
```

- Creates a merge commit with two parents.
- Keeps the exact history, including when the branch was started.
- Safe on shared branches, because no existing commit changes.

### Rebase

```bash
git switch feature
git rebase main
git push --force-with-lease
```

- Replays your commits on top of `main`, one by one.
- Produces a linear history that is easier to read with `git log --oneline`.
- Rewrites your commits, so everyone who has the old ones has to reset.

### Which one to use

1. Rebase your **own** branch before you open a pull request, so reviewers see a clean series.
2. Merge (or squash-merge) the pull request into `main`.
3. Never rebase a branch that other people have based work on.

If a rebase goes wrong, `git reflog` shows where your branch pointed before, and `git reset --hard HEAD@{1}` takes you back.

> `--force-with-lease` refuses to push if somebody else pushed to the branch since your last fetch. Plain `--force` would silently drop their commits.
