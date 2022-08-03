#!/bin/bash

set -e 
set -o pipefail

# set vars
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
BLOBS_DIR="${DIR}/blobs"

PHASE1_DIR="1-phase-1-dockerfile-asts"
PHASE2_DIR="2-phase-2-dockerfile-asts"
PHASE3_DIR="3-phase-3-dockerfile-asts"
PHASE4_DIR="4-abstracted-asts"

ASTS_OUT_DIR="${DIR}/${PHASE4}/outputs"

# Check if docker is running
if ! docker info > /dev/null 2>&1; then
  echo "Docker does not seem to be running, run it first and retry"
  exit 1
fi

# Check if the inputs are present
if [[ -d ${BLOBS_DIR} && -n "$(ls -A ${BLOBS_DIR})" ]]; then 
  echo "Processing dockerfiles blob from ${BLOBS_DIR}"
else
  echo "blobs directory doesn't exist. Please provide input dockerfiles in ${BLOBS_DIR}"
fi

# Check if the outputs are present
if [ -e "${PHASE1_DIR}/outputs/blobs_asts_p1.jsonl" ] || \
    [ -e "${PHASE2_DIR}/outputs/blobs_asts_p2.jsonl" ] || \
    [ -e "${PHASE3_DIR}/outputs/blobs_asts_p3.jsonl" ] || \
    [ -e "${PHASE4_DIR}/outputs/blobs_asts_p4.jsonl" ]; 
then
    echo "Output files already exist, delete them and retry"
    exit 1
fi

# phase 1
echo "Running phase 1..."   
cd "${DIR}/${PHASE1_DIR}" && bash generate.sh || exit 1

# phase 2
echo "Running phase 2..."   
cd "${DIR}/${PHASE2_DIR}" && bash generate.sh || exit 1

# phase 3
echo "Running phase 3..."   
cd "${DIR}/${PHASE3_DIR}" && bash generate.sh || exit 1

# phase 4
echo "Running phase 4..."   
cd "${DIR}/${PHASE4_DIR}" && bash generate.sh || exit 1

echo "Output ASTs stored in ${ASTS_OUT_DIR}"
echo "Done!"