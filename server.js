var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var app = express();

app.use('/', express.static('public'));
app.use(bodyParser.json());

var storedNotifications = [];
app.post('/notifications', function(req, resp) {
	storedNotifications = req.body;
	console.log("stored", storedNotifications);	
	resp.status(200).end(); 
});
app.get('/notifications', function(req, resp) {	
	console.log("responding with", storedNotifications)
	resp.json(storedNotifications);
});

var server = app.listen(8337, function () {
  var host = server.address().address;
  host == '::' && ( host = 'localhost' )
  var port = server.address().port;

  var url = 'http://'+host+':'+port

  console.log('App listening at %s', url);
  exec(url);
});