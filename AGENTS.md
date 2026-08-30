# Homepage Repository Rules

## Local backup workflow

- Before editing the homepage, inspect `git status --short --branch`.
- Do not make content or code edits directly on `main`.
- From a clean working tree, start a local draft branch with
  `npm run edit:start -- "short-description"`.
- After every meaningful modification, create a local checkpoint with
  `npm run checkpoint -- "what changed"`.
- Keep checkpoint commits focused so individual changes can be restored with
  `git revert`.

## Remote safety rule

- Never push `main`, merge remotely, dispatch the Pages workflow, change GitHub
  Pages settings, or otherwise modify the public website unless Huanming gives
  explicit permission for that specific publication in the current request.
- Permission to edit, test, commit, or create local backups is not permission to
  publish.
- Do not bypass `.githooks/pre-push` without that explicit permission.
- A normal checkpoint is local-only and must not perform a push.

See `docs/editing-workflow.md` for commands and recovery instructions.
