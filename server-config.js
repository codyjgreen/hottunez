var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', handler.renderIndex);
app.get('/api/songs', handler.fetchSongs);
app.post('/api/songs', handler.createSong);
app.get('/api/songs/:id', handler.fetchSong);
app.put('/api/songs/:id', handler.updateSong);
app.delete('/api/songs/:id', handler.deleteSong);
app.get('/*', handler.render404);

module.exports = app;
