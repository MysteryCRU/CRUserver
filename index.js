var app = require('express')();
//var campuses = require('./campuses/campuses.js');
var events = require('./events/events.js');
var push = require('./services/pushServices.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// I don't know what should happen when root is requested... so I'm leaving this
app.get('/', function (req, res, next) {
    res.writeHead(200, {
      'Content-Type' : 'text/html',
    });

   res.end('<!DOCTYPE html> <html> <head> <title>Test</title></head><body>'
           + '<h1>Testing Web Server, Bro!</h1></body></html>');
});

app.get('/campuses', function (req, res) {
	campuses.getCampuses(req, res);
});

app.get('/campuses/:id', function (req, res) {
	campuses.getCampusById(req, res);
});

app.get('/events', function (req, res) {
	events.getEvents(req, res);
});

app.get('/events/:id', function (req, res) {
	events.getEventById(req, res);
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
console.log('Yo this test worked sorta');
app.listen(8080);
