#!/bin/bash

gcloud auth login
gcloud config set project fsdev-ml
gcloud services list
gcloud services enable cloudfunctions.googleapis.com
gcloud functions deploy helloWorld --entry-point helloWorld --runtime nodejs14 --trigger-http --allow-unauthenticated