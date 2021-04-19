# --------------------------------------------------------
# Google Cloud Platform: configure project
# @MateiSirbu
# --------------------------------------------------------
# Execution of this script might incur additional charges.
# The author is not liable for any damages, so DYOR first.
# --------------------------------------------------------

#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments provided. Correct usage: $0 <GCP_PROJECT_NAME>"
    exit 1
fi

GCP_PROJECT_NAME=$1

gcloud auth login
gcloud config set project $GCP_PROJECT_NAME
gcloud services list
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com