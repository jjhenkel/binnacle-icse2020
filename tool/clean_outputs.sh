#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

rm "${DIR}/1-phase-1-dockerfile-asts/outputs/blobs_asts_p1.jsonl"
rm "${DIR}/2-phase-2-dockerfile-asts/outputs/blobs_asts_p2.jsonl"
rm "${DIR}/3-phase-3-dockerfile-asts/outputs/blobs_asts_p3.jsonl"
rm "${DIR}/4-abstracted-asts/outputs/blobs_asts_p4.jsonl"

echo "Done!"
