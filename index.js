var app = require('express')();
var events = require('./events/events.js');

// I don't know what should happen when root is requested... so I'm leaving this
app.get('/', function (req, res, next) {
   res.writeHead(200, {
      'Content-Type' : 'text/html',
    });

   res.end('<!DOCTYPE html> <html> <head> <title>Test</title></head><body>'
           + '<h1>Testing Web Server, Bro!</h1></body></html>');
});

app.get('/events', function (req, res) {
	events.getEvents(req, res);
})

app.get('/events/:id', function (req, res) {
	events.getEventById(req, res);
});

console.log('Yo this test worked sorta');
app.listen(8080);