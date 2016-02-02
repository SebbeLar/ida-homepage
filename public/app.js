var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    console.log(req.params);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/scripts/:file', function(req, res) {
  res.sendFile(path.join(__dirname + '/scripts/' + req.params.file));
});

app.get('/styles/:file', function(req, res) {
   console.log(req.params.file);
   res.sendFile(path.join(__dirname + '/styles/' + req.params.file));
});

app.get('/img/:file', function(req, res) {
   console.log(req.params.file);
   res.sendFile(path.join(__dirname + '/img/' + req.params.file));
});

app.get('/lib/:folder/:subfolder/:file', function(req, res) {
  console.log(req.params);
  res.sendFile(path.join(__dirname + '/lib/' + req.params.folder + '/' + req.params.subfolder + '/' + req.params.file));
});

app.get('/lib/:folder/:subfolder/:subsubfolder/:file', function(req, res) {
  console.log(req.params);
  res.sendFile(path.join(__dirname + '/lib/' + req.params.folder + '/' + req.params.subfolder + '/' + req.params.subsubfolder + '/' + req.params.file));
});

app.get('/lib/requirejs/:file', function(req, res) {
  res.sendFile(path.join(__dirname + '/lib/requirejs/' + req.params.file));
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
