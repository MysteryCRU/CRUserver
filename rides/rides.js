var util = require('util');
var BaseModel = require('../BaseModel.js');

function Rides(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(Rides, BaseModel);

module.exports = Rides;