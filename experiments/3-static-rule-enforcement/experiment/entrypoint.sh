#!/bin/bash

echo "Building..."
tsc
echo "  + Built!"

echo "Running..."
cat "${1}" | xz -cd | node /build/app.js \
  > /out/results-${2}-individual.txt

cat /out/results-${2}-individual.txt | jq -s ' [
reduce (.[] | to_entries[]) as {$key,$value} (
    {};
    .[$key] = {
        matches: (.[$key].matches + $value.matches),
        confirmations: (.[$key].confirmations + $value.confirmations),
        violations: (.[$key].violations + $value.violations),
    }
) 
| to_entries[] 
| { 
  (.key): { 
    "support": .value.matches,
    "confirmations": .value.confirmations,
    "violations": .value.violations,
    "confidence": (100.0 * (.value.confirmations / .value.matches)),
    "violationRate": (100.0 * (.value.violations / .value.matches))
  }
}
] | add'  > /out/results-${2}-summary.txt
echo "  + Finished!"
