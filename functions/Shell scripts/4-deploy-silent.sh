# --------------------------------------------------------
# Google Cloud Platform: non-interactive deployment
# @MateiSirbu
# --------------------------------------------------------
# Execution of this script might incur additional charges.
# The author is not liable for any damages, so DYOR first.
# --------------------------------------------------------

#!/bin/bash

FUNCTION_NAME=$1

cd ../$FUNCTION_NAME
gcloud alpha functions add-iam-policy-binding $FUNCTION_NAME --region=us-central1 --member=allUsers --role=roles/cloudfunctions.invoker
gcloud functions deploy $FUNCTION_NAME --entry-point $FUNCTION_NAME --runtime nodejs14 --quiet --trigger-http --allow-unauthenticated --region $GCP_REGION