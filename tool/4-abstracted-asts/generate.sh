#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
INPUT_DIR="${DIR}/../3-phase-3-dockerfile-asts/outputs/"
OUT_DIR="${DIR}/outputs"

mkdir -p "${DIR}/outputs"

# Build
docker build -t binnacle/artifact:generate-phase-4 \
  -f "${DIR}/generate/Dockerfile" "${DIR}/generate"

# Run with volume mounts
time docker run \
  -it \
  --rm \
  -v "${INPUT_DIR}:/mnt/inputs" \
  -v "${OUT_DIR}:/mnt/outputs" \
  binnacle/artifact:generate-phase-4
