#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Build
docker build -t binnacle/artifact:experiment-2 \
  -f "${DIR}/experiment/Dockerfile" "${DIR}/experiment"

# Run with volume mounts
time docker run \
  -it \
  --rm \
  -v "${DIR}/../../datasets:/datasets" \
  -v "${DIR}/experiment:/mnt/outputs" \
  binnacle/artifact:experiment-2

