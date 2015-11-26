var gcm = require('node-gcm');

// Set up the sender with you API key
var SENDER = new gcm.Sender('AIzaSyDNwhiWASCgUcrVhHhE0IvWfQFZZic3gyg');

//faking the entry into DB
var push;
/**
* PushToken object should come in the form 
* {
*   token:
*   type:'android'|'ios'|'win'
* }
*/
function register(user, pushToken){
   //TODO insert into token DB
   console.log(pushToken);
   push = pushToken;
}

function unregister(user){
   push = '';
}

/**
* criteria will be the criteria of whom the message must be sent out to
*/
function sendNotification(message,criteria){
   //query notification DB with criteria and compile list
   // call the sendCompiledNotification message
}


/**
*Send a gcm.message to all tokens specified in array
*/
function sendCompiledPush(message, regTokens){
   if(regTokens.length > 1000){
      throw "too many tokens" + regTokens.length;
   }
   // Now the sender can be used to send messages
   SENDER.send(message, { registrationTokens: regTokens }, function (err, response) {
      if(err) console.error(err);
      else    console.log(response);
   });
}

exports.sendNotification = sendNotification;
exports.register = register;
exports.unregister = unregister;
//TODO remove this before going live
exports.sendCompiledPush = sendCompiledPush;

