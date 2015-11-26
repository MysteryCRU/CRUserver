var app = require('express')();
//import push notification
var push = require('./services/pushServices.js');

var db = require('monk')(process.env.MONGO_URI);

// import event class/object and create a new instance
var Event = require('./events/events.js');
var events = new Event('events');

// import campus class/object and create a new instance
var Campus = require('./campuses/campuses.js');
var campuses = new Campus('campus');


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

// for Cntrl + C shutdowns
process.on('SIGINT', function() {
	closeServer();
});

app.post('/push/register', function(req, res){
      try{
         console.log(req.body);
         push.register('lol',req.body);
      } catch (e){
         console.log("error registering "+e);
         res.sendStatus(e);
         return;
      }
      console.log("logged register");
      res.sendStatus(200);                    
});

app.post('/push', function(req, res){
      push.sendCompiledPush();
});

app.post('/push/unregister', function(req, res){
      push.unregister();
});

// for kill/pkill shutdowns
process.on('SIGTERM', function() {
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
