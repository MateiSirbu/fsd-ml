#!/bin/bash

gcloud auth login
gcloud config set project fsd-ml
gcloud services list
gcloud services enable cloudfunctions.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud functions deploy fetchDesserts --entry-point fetchDesserts --runtime nodejs14 --trigger-http --allow-unauthenticated

# check it out at https://us-central1-fsd-ml.cloudfunctions.net/helloWorld