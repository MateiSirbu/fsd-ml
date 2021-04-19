# --------------------------------------------------------
# Google Cloud Platform: deploy to GCP
# @MateiSirbu
# --------------------------------------------------------
# Execution of this script might incur additional charges.
# The author is not liable for any damages, so DYOR first.
# --------------------------------------------------------

#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided. Correct usage: $0 <FUNCTION_NAME> [GCP_REGION]"
    echo "Make sure that the names of the function inside index.js and its parent folder coincide."
    exit 1
fi

if [ -z "$2" ]
  then
    echo "No region supplied, setting region to us-central1."
    GCP_REGION="us-central1"
  else
    GCP_REGION=$2
fi

FUNCTION_NAME=$1
PROJECT_NAME=$(gcloud config list --format 'value(core.project)')

cd ../$FUNCTION_NAME
gcloud functions deploy $1 --entry-point $1 --runtime nodejs14 --trigger-http --allow-unauthenticated
echo "Done, check it out at https://$GCP_REGION-$PROJECT_NAME.cloudfunctions.net/$FUNCTION_NAME!"