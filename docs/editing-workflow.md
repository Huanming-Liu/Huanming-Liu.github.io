# Safe Editing and Backup Workflow

The public homepage is deployed automatically whenever `main` is pushed to
GitHub. Local edits therefore use draft branches and local checkpoint commits.

## Start an editing session

The working tree must be clean before starting:

```bash
npm run edit:start -- "update-profile"
```

This creates a timestamped local branch such as
`draft/20260830-153000-update-profile`. It does not push anything.

## Save each meaningful change

```bash
npm run checkpoint -- "update English biography"
```

The command stages all current changes and creates a local Git commit. Run it
after every meaningful modification. It refuses to commit directly on `main`.

Useful inspection commands:

```bash
git status --short --branch
git log --oneline --decorate -10
git diff HEAD~1
```

## Publishing rule

Pushing `main` changes the remote website. The repository's pre-push hook
blocks that operation by default. Do not bypass it unless Huanming has given
explicit approval for the specific publication.

After approval, the acknowledgement is scoped to one command:

```bash
HOMEPAGE_DEPLOY_APPROVED=YES git push origin main
```

Pushing or publishing is never part of the checkpoint command.

## Restore a previous checkpoint

To inspect an older version without changing files:

```bash
git log --oneline
git show <commit>
```

To undo a committed change while preserving history:

```bash
git revert <commit>
```

Avoid `git reset --hard` for normal recovery because it can discard uncommitted
work.
