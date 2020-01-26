#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Build
docker build -t binnacle/artifact:experiment-3 \
  -f "${DIR}/experiment/Dockerfile" "${DIR}/experiment"

# Prepare table
docker run \
  -it \
  --rm \
  -v "${DIR}/experiment:/mnt" \
  --entrypoint /mnt/prepare-table.sh \
  binnacle/artifact:experiment-3

rm -f "${DIR}/experiment/figure.pdf"

docker run -it --rm -v "${DIR}/experiment:/data" -w /data aergus/latex \
  pdflatex \
    -synctex=1 \
    -interaction=nonstopmode \
    -file-line-error \
    -shell-escape \
    figure.tex

rm -f "${DIR}/experiment/figure.aux"
rm -f "${DIR}/experiment/figure.log"
rm -f "${DIR}/experiment/figure.synctex.gz"
