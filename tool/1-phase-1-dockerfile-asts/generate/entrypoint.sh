#!/bin/bash

# mkdir -p /mnt/github/dockerfiles
# mkdir -p /mnt/gold/dockerfiles

# echo "Extracting..."
# tar -xJf /mnt/inputs/github.tar.xz -C /mnt/github/dockerfiles
# tar -xJf /mnt/inputs/gold.tar.xz -C /mnt/gold/dockerfiles
# echo "  + Done!"

# find /mnt/github/dockerfiles -type f | sort \
#   | python3 /app/app.py github

# find /mnt/gold/dockerfiles -type f | sort \
#   | python3 /app/app.py gold

find /mnt/inputs/ -type f | sort \
  | python3 /app/app.py blobs_asts_p1
