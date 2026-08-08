#!/usr/bin/env bash
set -euo pipefail
# sync-funny.sh — keep root funny/placeholder and docs/funny/placeholder in sync
# Also syncs placeholder (both shown on mosaic). unfunny stays at root only, never in docs.
# Usage: bash scripts/sync-funny.sh [root->docs|docs->root]
# Default: root -> docs (if root has files)
DIR="$(cd "$(dirname "$0")/.." && pwd)"
ROOT_FUNNY="$DIR/funny"
DOCS_FUNNY="$DIR/docs/funny"
ROOT_PLACEHOLDER="$DIR/placeholder"
DOCS_PLACEHOLDER="$DIR/docs/placeholder"

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
  sync_pair "$DOCS_PLACEHOLDER" "$ROOT_PLACEHOLDER" "placeholder"
  node "$DIR/scripts/sync-manifest.js"
else
  # root -> docs
  if compgen -G "$ROOT_FUNNY/*.jpg" > /dev/null || compgen -G "$ROOT_FUNNY/*.png" > /dev/null || compgen -G "$ROOT_FUNNY/*.jpeg" > /dev/null; then
    sync_pair "$ROOT_FUNNY" "$DOCS_FUNNY" "funny"
  else
    echo "No images in funny/ to sync — skipping funny"
  fi
  if compgen -G "$ROOT_PLACEHOLDER/*.jpg" > /dev/null || compgen -G "$ROOT_PLACEHOLDER/*.png" > /dev/null || compgen -G "$ROOT_PLACEHOLDER/*.jpeg" > /dev/null; then
    sync_pair "$ROOT_PLACEHOLDER" "$DOCS_PLACEHOLDER" "placeholder"
  else
    echo "No images in placeholder/ to sync — skipping placeholder"
  fi
  node "$DIR/scripts/sync-manifest.js"
fi
echo "Done. Wall now shows funny + placeholder (unfunny never shown)."
