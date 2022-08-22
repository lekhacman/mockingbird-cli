#!/usr/bin/zsh
IMAGE_TAG=lekhacman/mockingbird:latest

#echo $IMAGE_TAG
docker build . -t $IMAGE_TAG
docker login
docker push $IMAGE_TAG
