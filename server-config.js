var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', handler.renderIndex);

module.exports = app;
