#!/bin/bash

mkdir -p /mnt/github/dockerfiles
mkdir -p /mnt/gold/dockerfiles

tar -xJf /mnt/inputs/github.tar.xz -C /mnt/github/dockerfiles
tar -xJf /mnt/inputs/gold.tar.xz -C /mnt/gold/dockerfiles

find /mnt/github/dockerfiles -type f \
  | python3 /app/app.py \
  | xz \
> /mnt/outputs/github.jsonl.xz

find /mnt/gold/dockerfiles -type f \
  | python3 /app/app.py \
  | xz \
> /mnt/outputs/gold.jsonl.xz
