#!/usr/bin/env bash
set -euo pipefail
# sync-funny.sh — keep root funny/ and docs/funny/ in sync
# Usage: bash scripts/sync-funny.sh [root->docs|docs->root]
# Default: root -> docs (if root/funny has files)
DIR="$(cd "$(dirname "$0")/.." && pwd)"
ROOT_FUNNY="$DIR/funny"
DOCS_FUNNY="$DIR/docs/funny"

MODE="${1:-root->docs}"

if [[ "$MODE" == "docs->root" ]]; then
  echo "Syncing docs/funny -> funny/ ..."
  mkdir -p "$ROOT_FUNNY"
  if command -v rsync >/dev/null 2>&1; then
    rsync -av --delete --exclude 'README.md' --exclude '.gitkeep' "$DOCS_FUNNY/" "$ROOT_FUNNY/"
  else
    # fallback without rsync (e.g., sandboxed env)
    for f in "$DOCS_FUNNY"/*.{jpg,jpeg,png,webp,gif,avif}; do [ -e "$f" ] || continue; cp -v "$f" "$ROOT_FUNNY/"; done
    # remove stray files in ROOT not in DOCS
    for f in "$ROOT_FUNNY"/*.{jpg,jpeg,png,webp,gif,avif}; do [ -e "$f" ] || continue; bf=$(basename "$f"); [ -e "$DOCS_FUNNY/$bf" ] || { echo "Removing stray $f"; rm -v "$f"; }; done
  fi
  node "$DIR/scripts/sync-manifest.js"
else
  echo "Syncing funny/ -> docs/funny ..."
  mkdir -p "$DOCS_FUNNY"
  if compgen -G "$ROOT_FUNNY/*.jpg" > /dev/null || compgen -G "$ROOT_FUNNY/*.png" > /dev/null || compgen -G "$ROOT_FUNNY/*.jpeg" > /dev/null; then
    if command -v rsync >/dev/null 2>&1; then
      rsync -av --exclude 'README.md' --exclude '.gitkeep' "$ROOT_FUNNY/" "$DOCS_FUNNY/"
    else
      for f in "$ROOT_FUNNY"/*.{jpg,jpeg,png,webp,gif,avif}; do [ -e "$f" ] || continue; cp -v "$f" "$DOCS_FUNNY/"; done
    fi
  else
    echo "No images in funny/ to sync — skipping copy"
  fi
  node "$DIR/scripts/sync-manifest.js"
fi
echo "Done."
