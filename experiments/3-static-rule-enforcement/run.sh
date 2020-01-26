#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Build
docker build -t binnacle/artifact:experiment-3 \
  -f "${DIR}/experiment/Dockerfile" "${DIR}/experiment"

# Run with volume mounts
time docker run \
  -it \
  --rm \
  -v "${DIR}/../../datasets:/datasets" \
  -v "${DIR}/experiment:/out" \
  binnacle/artifact:experiment-3 \
    /datasets/4-abstracted-asts/gold.jsonl.xz gold

if [ "${1}" = "--full" ]; then

  echo "[Warning] Doing full run (on github.jsonl.xz)..."
  echo "[Warning]   - This is slow..."
  time docker run \
    -it \
    --rm \
    -v "${DIR}/../../datasets:/datasets" \
    -v "${DIR}/experiment:/out" \
    binnacle/artifact:experiment-3 \
      /datasets/4-abstracted-asts/github.jsonl.xz github

fi
