var util = require('util');
var BaseModel = require('../BaseModel.js');

function Ministries(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(Ministries, BaseModel);

Ministries.prototype.getMinistriesByCampus = function (req, res, db) {
	var campuses = req.query.campuses;
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
				var str = JSON.stringify(data[i].campuses);
				for (var j = 0; j < campuses.length; ++j) {
					if (str.indexOf(campuses[j]) >= 0) {
						matches.push(data[i]);
						break;
					}
				}
			}

			res.json(matches);
		}
	});
};

module.exports = Ministries;