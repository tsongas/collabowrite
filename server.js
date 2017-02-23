var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var index = require('./routes/index');
var api = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.use('/', index);
app.use('/api', api);

mongoose.connect('mongodb://admin:password@ds137749.mlab.com:37749/pusher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function () {
  app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Node server running on port ' + process.env.PORT);
  });
});