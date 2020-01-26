#!/bin/bash

cat /datasets/1-phase-1-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | python3 /app/metrics.py --m1 \
  | python3 /app/histogram.py 20 \
  > /tmp/temp-1.txt

cat /datasets/2-phase-2-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | python3 /app/metrics.py --m2 \
  | python3 /app/histogram.py 20 \
  > /tmp/temp-2.txt

cat /datasets/3-phase-3-dockerfile-asts/github.jsonl.xz \
  | xz -cd \
  | python3 /app/metrics.py --m3 \
  | python3 /app/histogram.py 100 \
  > /tmp/temp-3.txt

cat /tmp/temp-1.txt | tail -n+5 > /mnt/outputs/eu-metric-1.tsv
cat /tmp/temp-2.txt | tail -n+5 > /mnt/outputs/eu-metric-2.tsv
cat /tmp/temp-3.txt | tail -n+5 > /mnt/outputs/eu-metric-3.tsv
cat /tmp/temp-3.txt | tail -n+5 | head -n2 > /mnt/outputs/eu-metric-3b.tsv

cat /tmp/temp-1.txt \
  | sed -e 's/Mean:/eu_mean_one/g' \
  | sed -e 's/Median:/eu_median_one/g' \
  | sed -e 's/Q25:/eu_q25_one/g' \
  | sed -e 's/Q75:/eu_q75_one/g' \
  | head -n4 \
  > /mnt/outputs/eu-data.env

cat /tmp/temp-2.txt \
  | sed -e 's/Mean:/eu_mean_two/g' \
  | sed -e 's/Median:/eu_median_two/g' \
  | sed -e 's/Q25:/eu_q25_two/g' \
  | sed -e 's/Q75:/eu_q75_two/g' \
  | head -n4 \
  >> /mnt/outputs/eu-data.env

cat /tmp/temp-3.txt \
  | sed -e 's/Mean:/eu_mean_three/g' \
  | sed -e 's/Median:/eu_median_three/g' \
  | sed -e 's/Q25:/eu_q25_three/g' \
  | sed -e 's/Q75:/eu_q75_three/g' \
  | head -n4 \
  >> /mnt/outputs/eu-data.env

# Actually prep figure.tex
rm -f /mnt/outputs/figure.tex
source /mnt/outputs/eu-data.env

cat /mnt/outputs/figure.template.tex \
  | sed -e "s/\\\\eudatum{eu_mean_one}/${eu_mean_one}/g" \
  | sed -e "s/\\\\eudatum{eu_mean_two}/${eu_mean_two}/g" \
  | sed -e "s/\\\\eudatum{eu_mean_three}/${eu_mean_three}/g" \
  | sed -e "s/\\\\eudatum{eu_median_one}/${eu_median_one}/g" \
  | sed -e "s/\\\\eudatum{eu_median_two}/${eu_median_two}/g" \
  | sed -e "s/\\\\eudatum{eu_median_three}/${eu_median_three}/g" \
  | sed -e "s/\\\\eudatum{eu_q25_one}/${eu_q25_one}/g" \
  | sed -e "s/\\\\eudatum{eu_q25_two}/${eu_q25_two}/g" \
  | sed -e "s/\\\\eudatum{eu_q25_three}/${eu_q25_three}/g" \
  | sed -e "s/\\\\eudatum{eu_q75_one}/${eu_q75_one}/g" \
  | sed -e "s/\\\\eudatum{eu_q75_two}/${eu_q75_two}/g" \
  | sed -e "s/\\\\eudatum{eu_q75_three}/${eu_q75_three}/g" \
  > /mnt/outputs/figure.tex
