var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handler = require('./lib/request-handler');
var dotenv = require('dotenv');
var jwt = require('express-jwt');
// Seed the database
var seedDb = require('./seedDb');
// seedDb();

dotenv.load();

var authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

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
app.post('/api/playlists', authenticate, handler.createPlaylist);
app.get('/api/playlists/:id', handler.fetchPlaylist);
app.put('/api/playlists/:id', authenticate, handler.updatePlaylist);
app.delete('/api/playlists/:id', authenticate, handler.deletePlaylist);

app.get('/*', handler.render404);

module.exports = app;
