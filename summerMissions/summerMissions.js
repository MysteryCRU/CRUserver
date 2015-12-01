var util = require('util');
var BaseModel = require('../BaseModel.js');

function SummerMissions(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(SummerMissions, BaseModel);

module.exports = SummerMissions;