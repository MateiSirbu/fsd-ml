# --------------------------------------------------------
# Google Cloud Platform: compile function
# @MateiSirbu
# --------------------------------------------------------

#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided. Correct usage: $0 <FUNCTION_NAME>"
    echo "Make sure that the names of the function inside index.ts and its parent folder coincide."
    exit 1
fi

FUNCTION_NAME=$1

cd ../$FUNCTION_NAME
npx tsc ./index.ts