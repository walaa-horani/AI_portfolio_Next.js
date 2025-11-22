#!/bin/bash

# ⚡ Simple Sanity Import Script
# This script imports all .ndjson files inside the data folder
# into your chosen Sanity dataset.

DATASET=${1:-development}

echo "🚀 Importing all .ndjson files into dataset: $DATASET"
echo ""

# Go to data folder
cd data || { echo "❌ Error: data folder not found!"; exit 1; }

# Loop through all .ndjson files
for FILE in *.ndjson; do
  echo "📥 Importing $FILE ..."
  sanity dataset import "$FILE" "$DATASET" --replace --allow-failing
  echo "---------------------------------------"
done

echo "✅ All files imported successfully!"
