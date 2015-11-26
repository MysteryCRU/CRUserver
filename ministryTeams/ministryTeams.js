var util = require('util');
var BaseModel = require('../BaseModel.js');

function MinistryTeams(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(MinistryTeams, BaseModel);

module.exports = MinistryTeams;