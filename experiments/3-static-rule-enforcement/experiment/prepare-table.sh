#!/bin/bash

rm -f /mnt/table-final.csv
touch /mnt/table-final.csv

echo "ruleName,bashBestPractice,immediateImpact,futureImpact,goldSupport,goldConfidence" >> /mnt/table-final.csv
while read x; do
  KEY=$(echo $x | awk -F, '{ print $1 }')
  SUPPORT=$(cat /mnt/results-gold-summary.txt | jq ".$KEY.support")
  CONFIDENCE=$(cat /mnt/results-gold-summary.txt | jq ".$KEY.confidence")
  REST=$(echo $x | awk -F, '{ print $2 "," $3 "," $4 "," $5 }')
  echo "${REST},${SUPPORT},${CONFIDENCE}" >> /mnt/table-final.csv
done < <(tail -n+2 /mnt/table-partial.csv)
