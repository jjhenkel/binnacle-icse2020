#!/bin/bash

cd /app/idioms

trap "echo 'CTRL-C Pressed. Quiting...'; exit;" SIGINT SIGTERM

echo "Extracting..."
# Extract abstracted asts to /tmp
cat /datasets/4-abstracted-asts/gold.jsonl.xz \
  | xz -cd \
> /tmp/gold.jsonl
echo "  + Done!"

rm -f /mnt/outputs/mined-rules.json
touch /mnt/outputs/mined-rules.json

echo "Mining rules... (this can be slow)"
# For every new node type created in Phase-III (that is, the SC-* nodes)
for t in $(cat /app/new-node-types-phase-3.txt); do
  # Get everything rooted at $t
  SELECTED_SUBTRESS=$(
    cat /tmp/gold.jsonl \
    | jq -c ".. | select(.type? == \"${t}\")"
  )

  COUNT=$(
    echo -n "${SELECTED_SUBTRESS}" | wc -l
  )

  if [ "${COUNT}" -ge "50" ]; then
    echo "  + Mining idioms for nodes rooted at \"${t}\":"
    echo -n "${SELECTED_SUBTRESS}" \
      | /app/idioms/bin/Release/netcoreapp2.2/ubuntu.14.04-x64/publish/idioms \
    >> /mnt/outputs/mined-rules.json
    echo "    + $(cat /mnt/outputs/mined-rules.json | wc -l) idiom(s) discovered so far"
  else
    echo "  - Not mining idioms for nodes rooted at \"${t}\": only ${COUNT} < (min-support=50) such trees"
  fi

done
echo "  + Done!"
