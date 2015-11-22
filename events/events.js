var monk = require('monk');
var COLLECTION = 'events';

/**
 * Get a array of all events and send a JSON response to the app
 */
function getEvents(req, res) {
	var db = getDB();

	// get events collection, find all events in the collection
	db.get(COLLECTION).find({}, function (err, data) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
		} else {
			// send that data in JSON format
			res.json(data);
		}

		// close the database connection
		db.close();
	});
}

/**
 * Get a single event based on it's id in the database
 */
function getEventById(req, res) {
	var db = getDB();

	// find the event with the specified id in the collection
	db.get(COLLECTION).find({ _id: req.params.id }, function (err, data) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
		} else {
			// send that data in JSON format
			res.json(data[0]);
		}

		db.close();
	});
}

/**
 * Connect to the database and return that database
 */
function getDB() {
	return monk(process.env.MONGO_URI);
}

// export the functions below for modularity
exports.getEvents = getEvents;
exports.getEventById = getEventById;