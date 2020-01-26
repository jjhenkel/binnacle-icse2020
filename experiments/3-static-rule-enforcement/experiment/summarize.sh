#!/bin/bash

cat results.txt | jq -s '
reduce (.[] | to_entries[]) as {$key,$value} (
    {};
    .[$key] = {
        matches: (.[$key].matches + $value.matches),
        confirmations: (.[$key].confirmations + $value.confirmations),
        violations: (.[$key].violations + $value.violations)
    }
)'
