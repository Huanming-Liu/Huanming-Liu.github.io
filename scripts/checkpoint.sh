#!/usr/bin/env bash

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

branch="$(git branch --show-current)"

if [[ -z "$branch" ]]; then
  echo "Cannot create a checkpoint from a detached HEAD." >&2
  exit 1
fi

if [[ "$branch" == "main" ]]; then
  echo "Refusing to checkpoint edits directly on main." >&2
  echo "Run: npm run edit:start -- \"short-description\"" >&2
  exit 1
fi

if [[ -z "$(git status --porcelain)" ]]; then
  echo "Nothing to checkpoint; the working tree is clean."
  exit 0
fi

description="${*:-homepage update}"
timestamp="$(date '+%Y-%m-%d %H:%M:%S %z')"

git add --all
git commit -m "checkpoint: ${description}" -m "Local snapshot created at ${timestamp}."

echo "Checkpoint saved locally on branch: $branch"
echo "No push was performed and the public homepage was not changed."
