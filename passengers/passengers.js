var util = require('util');
var BaseModel = require('../BaseModel.js');

function Passengers(collection) {
        BaseModel.apply(this, new Array(collection));
}

util.inherits(Passengers, BaseModel);

module.exports = Passengers;
