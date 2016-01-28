#! /bin/bash


# Config - Which collections to copy over
collections='campus events posts users ministries summermissions ministryteams'


# First, download the JSON for each collection from the official cru database
echo " --- Downloading JSON ---"
mkdir -p JSON
rm -rf JSON/*
for collection in $collections
do
    mongo ds049754.mongolab.com:49754/heroku_s75tvv20 -u capstone-class -p capstone-2015-2016 --quiet --eval "function printResult(r) { print(tojson(r)); } db.$collection.find().forEach(printResult);" > "JSON/$collection.json"
done

# Now upload that JSON to the local database
echo " --- Importing JSON ---"
for collection in $collections
do
    mongoimport --db cru --collection $collection --file "JSON/$collection.json" --drop
done

# Finally, run the mongo script to add additional views to the local database
echo " --- Updating fields ---"
mongo cru UpdateTables.js
