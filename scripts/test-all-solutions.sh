#!/bin/bash
# Go through all the solution steps and run all the tests


BASE_DIR=`dirname $0`

for sha in `git log --oneline --reverse | grep "step-.*solution" | cut -d ' ' -f 1`; do
  git checkout $sha -q
  git log --oneline -1
  $BASE_DIR/../node_modules/testacular/bin/testacular start $BASE_DIR/../config/testacular.conf.js --single-run --log-level error
  $BASE_DIR/../node_modules/testacular/bin/testacular start $BASE_DIR/../config/testacular-e2e.conf.js --single-run --log-level error
  echo ""
done
