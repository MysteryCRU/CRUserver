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

module.exports = Users;