var util = require('util');
var BaseModel = require('../BaseModel.js');

function Ministries(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(Ministries, BaseModel);

Ministries.prototype.testModel = function() {
	console.log('Look Ministries works to!');
};

module.exports = Ministries;