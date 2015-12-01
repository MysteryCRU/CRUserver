function BaseModel(collectionName) {
	this.collection = collectionName;
}

BaseModel.prototype.getAll = function(req, res, db) {
	// get events collection, find all campuses in the collection
	db.get(this.collection).find({}, function (err, data) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
		} else {
			// send that data in JSON format
			res.json(data);
		}
	});
};

BaseModel.prototype.getById = function(req, res, db) {
	// find the campus with the specified id in the collection
	db.get(this.collection).find({ _id: req.params.id }, function (err, data) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
		} else {
			// send that data in JSON format if there is any, null otherwise no
			// match was found in the database for the id.
			data.length >= 1 ? res.json(data[0]) : res.json(null);
		}
	});
};

module.exports = BaseModel;