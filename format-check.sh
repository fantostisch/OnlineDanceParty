#!/bin/bash
# Prettier does not provide the functionality to show what is wrong:
# https://github.com/prettier/prettier/issues/6069
# todo: prettier is run 2 times, can we run it once?
failed=0
prettier_command="npx -q prettier@2.2.1"
for file in $($prettier_command -l .) ; do
  echo "$file is incorrectly formatted."
  $prettier_command "$file" | colordiff "$file" -
  failed=1
done
exit "$failed"
