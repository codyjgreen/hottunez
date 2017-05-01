var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var url = "mongodb://localhost/mvp";
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
  console.log('MongoDB connection open!');
});

module.exports = db;
