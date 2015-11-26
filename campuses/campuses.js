var util = require('util');
var BaseModel = require('../BaseModel.js');

function Campuses(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(Campuses, BaseModel);

Campuses.prototype.testModel = function () {
	console.log('Campuses model is working');
};

module.exports = Campuses;