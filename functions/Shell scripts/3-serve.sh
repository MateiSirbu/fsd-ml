# --------------------------------------------------------
# Google Cloud Platform: serve function locally
# @MateiSirbu
# --------------------------------------------------------

#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided. Correct usage: $0 <FUNCTION_NAME>"
    echo "Make sure that the names of the function inside index.js and its parent folder coincide."
    exit 1
fi

FUNCTION_NAME=$1

npx ../$FUNCTION_NAME/@google-cloud/functions-framework --target=$FUNCTION_NAME