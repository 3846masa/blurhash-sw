#!/bin/bash
VERSION=$1
FILES=$(git grep -l -E 'blurhash-sw@[0-9]+\.[0-9]+\.[0-9]+') 

for FILE in $FILES; do
  sed -E "s/blurhash-sw@[0-9]+\.[0-9]+\.[0-9]+/blurhash-sw@${VERSION}/g" -i $FILE
done
