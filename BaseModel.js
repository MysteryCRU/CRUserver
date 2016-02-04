function BaseModel(collectionName) {
	this.collection = collectionName;
}

BaseModel.prototype.getAll = function(req, res, db) {
	// get events collection, find all campuses in the collection
	db.get(this.collection).find({}, function (err, data) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
			console.log(err);
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


BaseModel.prototype.deleteById = function(req, res, db) {
        //delete it from the DB
	db.get(this.collection).remove({ _id: req.params.id }, function (err) {
		if (err) {
			// send internal server error status to client
			res.sendStatus(500);
                        throw err;
		}
	});
        console.log("deleted " + req.params.id);
        res.sendStatus(200);
};

/*
******************WARNING DOES NO VALIDATION ****************
*/
BaseModel.prototype.add = function(req, res, db) {
	/*for(key in req.query) {
        	console.log(key + " " + req.query[key]);
        }*/
	db.get(this.collection).insert(req.query, function(err) {
		if(err) {
			res.sendStatus(500);
			throw err;
		}
	});
	res.sendStatus(200);
};

module.exports = BaseModel;
