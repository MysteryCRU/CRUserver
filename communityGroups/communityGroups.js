var util = require('util');
var BaseModel = require('../BaseModel.js');

function CommunityGroups(collection) {
	BaseModel.apply(this, new Array(collection));
}

util.inherits(CommunityGroups, BaseModel);

module.exports = CommunityGroups;