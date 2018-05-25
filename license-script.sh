#!/usr/bin/env bash
#

# make this a webpack-loader?? 

echo "executing license script!!"
OUTPUT="$(yarn licenses list)"
echo "${OUTPUT}"

echo "Attempting to push code to server"
# use curl to push to the server