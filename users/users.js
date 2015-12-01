var util = require('util');
var BaseModel = require('../BaseModel.js'); // import base model for code reuse

// create constructor for events
function Users(collection) {
    // pass parameters to super class
	BaseModel.apply(this, new Array(collection));
}

// apply inheritance
util.inherits(Users, BaseModel);

Users.prototype.modelTest = function() {
	console.log('users model works');
};

Users.prototype.createUser = function(req, res, db) {
	var user = req.body;
	
	// DATA VALIDATION GOES HERE. FOR A LATER DATE...

	// insert new user into the database
	db.get(this.collection).insert(user, function (err, data) {
		if (err) {
			res.sendStatus(500);
			console.log(err);
		} else {
			console.log(data);
		}
	});
};

module.exports = Users;