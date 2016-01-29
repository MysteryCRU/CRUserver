
//
// Add ministries field to campus collection
//
iterator = db.ministries.find({}, {"_id": 1, "campuses": 1});
while ( iterator.hasNext() ) {
    ministry = iterator.next();

    ministryId = ministry["_id"];
    ministryCampuses = ministry["campuses"];

    if (ministryCampuses.length == 0) {
        // In the production DB this would be an error. For the test DB
        // this is often true.
        print("Ministry " + ministryId +  " has no campuses.");
    }

    for (index = 0; index < ministryCampuses.length; ++index) {
        print("Adding ministry " + ministryId + " to campus " + ministryCampuses[index]);

        db.campus.update(
            { _id: ministryCampuses[index]},
            { $push: { ministries: ministryId } }
        );
    }
}

//
// Add events field to ministries collection
//
iterator = db.events.find({}, {"_id": 1, "parentMinistries": 1});
while ( iterator.hasNext() ) {
    evnt = iterator.next();

    evntId = evnt["_id"];
    evntMinistries = evnt["parentMinistries"];

    if (evntMinistries.length == 0) {
        print("Event " + evntId +  " has no ministries.");
    }

    for (index = 0; index < evntMinistries.length; ++index) {
        print("Adding event " + evntId + " to ministry " + evntMinistries[index]);

        db.ministries.update(
            { _id: evntMinistries[index]},
            { $push: { events: evntId } }
        );
    }
}
