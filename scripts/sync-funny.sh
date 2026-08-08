#!/usr/bin/env bash
set -euo pipefail
# sync-funny.sh — keep root funny/ and docs/funny/ in sync
# placeholder deleted 2026-08-08 — all new images go to funny by default
# unfunny stays at root only, never in docs
# Usage: bash scripts/sync-funny.sh [root->docs|docs->root]
# Default: root -> docs
DIR="$(cd "$(dirname "$0")/.." && pwd)"
ROOT_FUNNY="$DIR/funny"
DOCS_FUNNY="$DIR/docs/funny"
MODE="${1:-root->docs}"

sync_pair() {
  local src="$1" dst="$2" label="$3"
  echo "Syncing $label: $src -> $dst ..."
  mkdir -p "$dst"
  if command -v rsync >/dev/null 2>&1; then
    if [[ "$MODE" == "docs->root" ]]; then
      rsync -av --delete --exclude 'README.md' --exclude '.gitkeep' "$src/" "$dst/"
    else
      rsync -av --exclude 'README.md' --exclude '.gitkeep' "$src/" "$dst/"
    fi
  else
    for f in "$src"/*.{jpg,jpeg,png,webp,gif,avif}; do [ -e "$f" ] || continue; cp -v "$f" "$dst/"; done
    if [[ "$MODE" == "docs->root" ]]; then
      for f in "$dst"/*.{jpg,jpeg,png,webp,gif,avif}; do [ -e "$f" ] || continue; bf=$(basename "$f"); [ -e "$src/$bf" ] || { echo "Removing stray $f"; rm -v "$f"; }; done
    fi
  fi
}

if [[ "$MODE" == "docs->root" ]]; then
  sync_pair "$DOCS_FUNNY" "$ROOT_FUNNY" "funny"
else
  if compgen -G "$ROOT_FUNNY/*.jpg" > /dev/null || compgen -G "$ROOT_FUNNY/*.png" > /dev/null || compgen -G "$ROOT_FUNNY/*.jpeg" > /dev/null; then
    sync_pair "$ROOT_FUNNY" "$DOCS_FUNNY" "funny"
  else
    echo "No images in funny/ to sync — skipping"
  fi
fi
node "$DIR/scripts/sync-manifest.js"
echo "Done. Wall shows docs/funny only (unfunny at root never shown, placeholder deleted)."
