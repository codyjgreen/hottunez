var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');

var app = express();

app.use(morgan('short'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/songs', handler.fetchSongs);
app.post('/api/songs', handler.createSong);
app.get('/api/songs/:id', handler.fetchSong);
app.put('/api/songs/:id', handler.updateSong);
app.delete('/api/songs/:id', handler.deleteSong);

app.get('/api/playlists', handler.fetchPlaylists);
app.post('/api/playlists', handler.createPlaylist);
app.get('/api/playlists/:id', handler.fetchPlaylist);
app.put('/api/playlists/:id', handler.updatePlaylist);
app.delete('/api/playlists/:id', handler.deletePlaylist);

app.get('/*', handler.render404);

module.exports = app;
