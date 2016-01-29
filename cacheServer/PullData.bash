#! /bin/bash


# Config - Which collections to copy over
collections='campus events posts users ministries summermissions ministryteams'

if [ -z $3 ]
then
	echo "usage: ./PullData.bash <server> <password> <database>"
	exit 1
fi

echo "Connection to server '$1', database '$3' ..."

# First, download the JSON for each collection from the official cru database
echo " --- Downloading JSON ---"
mkdir -p JSON
for collection in $collections
do
    mongo "$1" -u $3 -p "$2" --quiet --eval "function printResult(r) { print(tojson(r)); } db.$collection.find().forEach(printResult);" > "JSON/$collection.json"
done

# Now upload that JSON to the local database
echo " --- Importing JSON ---"
for collection in $collections
do
    mongoimport --db cru --collection $collection --file "JSON/$collection.json" --drop
done
rm -rf JSON/*

# Finally, run the mongo script to add additional views to the local database
echo " --- Updating fields ---"
mongo cru UpdateTables.js
