var express = require('express');
var exec = require('child_process').exec;
var app = express();

app.use('/', express.static('public'));

var server = app.listen(8337, function () {
  var host = server.address().address;
  host == '::' && ( host = 'localhost' )
  var port = server.address().port;

  var url = 'http://'+host+':'+port

  console.log('App listening at %s', url);
  exec(url);
});