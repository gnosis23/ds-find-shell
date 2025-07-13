set -e

mkdir -p dist

esbuild src/cli.js \
  --bundle \
  --platform=node \
  --target=node16 \
  --format=esm \
  --outfile=dist/ds-find-shell.js \
  --banner:js="#!/usr/bin/env node" \
  --external:child_process
