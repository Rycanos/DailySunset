#!/bin/bash

id=$(< "./currentFileId")
newId=$(($id + 1))
echo $newId > "./currentFileId"

DATE=$(date +"%Y-%m-%d_%H%M")
picName="./Pictures/${newId}Sunset_${DATE}.jpg"

echo $picName

#fswebcam -r 1280x720 --no-banner ./Pictures/Sunset_$(DATE)_id-$(newId).jpg
fswebcam -r 1280x720 --no-banner $picName
