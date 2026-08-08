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

copy_images() {
  local src="$1"
  local dst="$2"
  local ext
  shopt -s nullglob nocaseglob
  mkdir -p "$dst"
  for ext in jpg jpeg png webp gif avif; do
    local f
    for f in "$src"/*."$ext"; do
      cp -f "$f" "$dst/"
    done
  done
  shopt -u nullglob nocaseglob
}

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
    copy_images "$src" "$dst"
    if [[ "$MODE" == "docs->root" ]]; then
      local f base
      shopt -s nullglob nocaseglob
      for f in "$dst"/*.{jpg,jpeg,png,webp,gif,avif}; do
        base=$(basename "$f")
        if [[ ! -e "$src/$base" ]]; then
          echo "Removing stray $f"
          rm -f "$f"
        fi
      done
      shopt -u nullglob nocaseglob
    fi
  fi
}

if [[ "$MODE" == "docs->root" ]]; then
  sync_pair "$DOCS_FUNNY" "$ROOT_FUNNY" "funny"
else
  if find "$ROOT_FUNNY" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.gif' -o -iname '*.avif' \) -print -quit 2>/dev/null | grep -q .; then
    sync_pair "$ROOT_FUNNY" "$DOCS_FUNNY" "funny"
  else
    echo "No images in funny/ to sync — skipping"
  fi
fi
node "$DIR/scripts/sync-manifest.js"
echo "Done. Wall shows docs/funny only (unfunny at root never shown, placeholder deleted)."
