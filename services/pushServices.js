var gcm = require('node-gcm');

// Set up the sender with you API key
var SENDER = new gcm.Sender('AIzaSyDNwhiWASCgUcrVhHhE0IvWfQFZZic3gyg');

//faking the entry into DB
var push;
/**
* register push token to specific user
* PushToken object should come in the form 
* {
*   token:
*   type:'android'|'ios'|'win'
* }
*/
function registerPushDevice(userId, pushToken, db){
   if(!pushToken.token || !pushToken.type){
      throw 'invalid token object' + JSON.stringify(pushToken);
   }
   db.get('users').update({_id: userId}, {$set: { 'notifications.pushToken': pushToken} } , function(err, count, status){
      console.log("registering for"+userId+"...");
      if(err){
         console.log(err);
      }
      console.log("updated "+count+" results with a status "+status+" and err "+err);
   });
}
/*function unregisterPushDevice(userId, db){

   db.get('users').updateById( userId, {$unset: { pushToken}}, function(err, count){
   
      if(err){
         throw err;
      } else if(count <= 0 ) {
         throw 'could not remove pushtoken'+'from userId'+JSON.stringify(userId);
      }
      
   });

}*/

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
exports.register = registerPushDevice;
//exports.unregister = unregisterPushDevice;
//TODO remove this before going live
exports.sendCompiledPush = sendCompiledPush;

