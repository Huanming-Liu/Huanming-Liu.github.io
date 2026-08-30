#!/usr/bin/env bash

set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
cd "$repo_root"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Cannot start a new edit: the working tree already has changes." >&2
  echo "Create a checkpoint or handle the existing changes first." >&2
  exit 1
fi

label="${1:-homepage}"
safe_label="$(printf '%s' "$label" | tr '[:upper:]' '[:lower:]' | tr -cs '[:alnum:]' '-' | sed 's/^-//; s/-$//')"

if [[ -z "$safe_label" ]]; then
  safe_label="homepage"
fi

timestamp="$(date '+%Y%m%d-%H%M%S')"
branch="draft/${timestamp}-${safe_label}"

git switch -c "$branch"

echo "Created local editing branch: $branch"
echo "No remote branch was created and the public homepage was not changed."
echo "After editing, save a checkpoint with: npm run checkpoint -- \"description\""
