


function AddBackConnections(fromCollectionName, toCollectionName, fromField, toField) {

    fromCollection = db.getCollection(fromCollectionName);
    toCollection = db.getCollection(toCollectionName);

    query = {};
    query["_id"] = 1;
    query[fromField] = 1;

    iterator = fromCollection.find({}, query);
    while ( iterator.hasNext() ) {
        fromRow = iterator.next();

        fromRowId = fromRow["_id"];
        fromRowBackConnections = fromRow[fromField];

        if (typeof fromRowBackConnections == 'undefined') {
            print("Field '" + fromField + "' apparently does not exist in row from '" + fromCollection + "'");
            print(tojson(fromRow));
            continue;
        }

        if (0 == fromRowBackConnections.length) {
            // In the production DB this would be an error. For the test DB
            // this is often true.
            print("Element in '" + fromCollectionName + "' has no back connections: " + fromRowId);
        }

        fromRowBackConnections.forEach(function(toRowId) {
            print("Adding connection from '" + fromCollectionName + "'' (" + fromRowId + ") to element in '" + toCollectionName + "' (" + toRowId + ")");

            query = {};
            query[toField] = fromRowId;

            toCollection.update(
                { _id: toRowId},
                { $push: query }
            );
        });
    }

}


AddBackConnections("ministries", "campus", "campuses", "ministries");
AddBackConnections("events", "ministries", "parentMinistries", "events");
