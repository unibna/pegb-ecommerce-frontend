#!/bin/bash

SERVICE_NAME=$1
VERSION=$2
PROJECT_NAME="pegb-ecommerce"
IMAGE_NAME="$PROJECT_NAME/pegb-ecommerce-$SERVICE_NAME:$VERSION"


if [[ "$SERVICE_NAME" == "frontend" ]];
then
    echo "Building $IMAGE_NAME image..."
    docker build \
        --platform=linux/amd64 \
        -t $IMAGE_NAME \
        -f dockerfiles/frontend.dockerfile . 
    echo "Pushing $IMAGE_NAME image..."
    docker push $IMAGE_NAME
else
    echo "seriver is not supported. service_name: $SERVICE_NAME"
fi
