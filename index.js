var app = require('express')();

app.get('/', function (req, res, next) {
   res.writeHead(200, {
      'Content-Type' : 'text/html',
    });

   res.end('<!DOCTYPE html> <html> <head> <title>Test</title></head><body>'
           + '<h1>Testing Web Server, Bro!</h1></body></html>');
}

console.log('Yo this test worked sorta');
app.listen(8080);