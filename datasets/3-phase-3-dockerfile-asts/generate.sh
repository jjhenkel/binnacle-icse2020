#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Build
docker build -t binnacle/artifact:generate-phase-3 \
  -f "${DIR}/generate/Dockerfile" "${DIR}/generate"

# Run with volume mounts
time docker run \
  -it \
  --rm \
  -v "${DIR}/../2-phase-2-dockerfile-asts:/mnt/inputs" \
  -v "${DIR}:/mnt/outputs" \
  binnacle/artifact:generate-phase-3
