var util = require('util');
var BaseModel = require('../BaseModel.js'); // import base model for code reuse

// create constructor for events
function Events(collection) {
    // pass parameters to super class
	BaseModel.apply(this, new Array(collection));
}

// apply inheritance
util.inherits(Events, BaseModel);

Events.prototype.getEventsByMinistry = function (req, res, db) {
	var mins = req.query.mins;
	var matches = [];

	db.get(this.collection).find({}, function (err, data) {
		if (err) {
			// send internal server error status to client
			console.log(err);
			res.sendStatus(500);
		} else {
			// go through all the ministries turn the campus id's into
			// strings for comparison and then add them to a results array
			// this is gross, i know...
			for (var i = 0; i < data.length; ++i) {
				var str = JSON.stringify(data[i].parentMinistries);
				for (var j = 0; j < mins.length; ++j) {
					if (str.indexOf(mins[j]) >= 0) {
						matches.push(data[i]);
						break;
					}
				}
			}

			res.json(matches);
		}
	});
};

module.exports = Events;