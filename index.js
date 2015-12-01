var app = require('express')();

var bodyParser = require('body-parser');

//import push notification
var push = require('./services/pushServices.js');

var db = require('monk')(process.env.MONGO_URI);

// import event class/object and create a new instance
var Event = require('./events/events.js');
var events = new Event('events');

// import campus class/object and create a new instance
var Campus = require('./campuses/campuses.js');
var campuses = new Campus('campus');

// import user class/object and create a new instance
var User = require('./services/userServices.js');
var users = new User('users');

//read the the post payload with body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// I don't know what should happen when root is requested... so I'm leaving this
app.get('/', function (req, res, next) {
    res.writeHead(200, {
      'Content-Type' : 'text/html',
    });

   res.end('<!DOCTYPE html> <html> <head> <title>Test</title></head><body>'
           + '<h1>Testing Web Server, Bro!</h1></body></html>');
});

app.get('/campuses', function (req, res) {
	campuses.getAll(req, res, db);
});

app.get('/campuses/:id', function (req, res) {
	campuses.getById(req, res, db);
});

app.get('/events', function (req, res) {
	events.getAll(req, res, db);
});

app.get('/events/:id', function (req, res) {
	events.getById(req, res, db);
});

//push notification end points
/**
* registering a device to the user
*/
app.post('/users/:id/push', function(req, res){
  if(!req.body) {
    res.sendStatus(400);
    return;
  }

  try{
     push.register(req.params.id, req.body, db);
  } catch (e){
     console.log("error registering " + e);
     res.sendStatus(500);
     return;
  }
  console.log("logged register");
  res.sendStatus(200);                    
});

/**
* unregistering a device to the user
*/
app.delete('/users/:id/push', function(req, res){
    if(!req.body) {
      res.sendStatus(400);
      return;
    }

    try {
      push.unregister(req.params.id, db);
    } catch (e) {
      console.log("error unregistering" + e);
      res.sendStatus(e);
      return;
    }
});

/**
* create a push notification to a specific user
* {"message":"send this to errrrryone"}
*/
app.post('/push', function(req, res){
    if(!req.body) {
      throw 'need value to send';
    } 
    //TODO make the push notifications work without 
    var gcm = require('node-gcm');
    var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        restrictedPackageName: "somePackageName",
        dryRun: true,
        data: {
            key1: 'message1',
            key2: 'message2'
        },
        notification: {
            title: "Hello, World",
            icon: "ic_launcher",
            body: req.body.message
        }
    });

    db.get('users').find({}, function(err, data){
      if(err){
        throw "cannot get users list";
      }
      var tokenList = [];
      data.forEach(function(user){
        if(user.notifications.pushToken){
          tokenList.push(user.notifications.pushToken.token);
        }
      });
      if(tokenList.length == 0){
        console.log(" no users with tokens found");
      }
      console.log(tokenList);
      push.sendCompiledPush(message, tokenList);

    });
    

});

app.get('/users', function (req, res) {
    users.getAll(req, res, db);
});

app.get('/users/:id', function (req, res) {
    users.getById(req, res, db);
});

// for kill/pkill shutdowns
process.on('SIGTERM', function() {
	closeServer();
});

// for Cntrl + C shutdowns
process.on('SIGINT', function() {
  closeServer();
});


function closeServer() {
	console.log('Closing connection to database...');
	db.close(function() {
		console.log('Exiting program now.');
		process.exit();
	});
}

app.listen(8080);
