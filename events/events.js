var util = require('util');
var BaseModel = require('../BaseModel.js'); // import base model for code reuse

// create constructor for events
function Events(collection) {
    // pass parameters to super class
	BaseModel.apply(this, new Array(collection));
}

// apply inheritance
util.inherits(Events, BaseModel);

Events.prototype.modelTest = function() {
	console.log('Yay the events model worked!');
};

module.exports = Events;