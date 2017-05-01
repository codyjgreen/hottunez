var db = require('../app/config');
var Song = require('../models/song');

exports.renderIndex = function(req, res) {
  res.send('You just hit the / route!');
};

exports.fetchSongs = function(req, res) {
  Song.find()
    .then(function(songs) {
      res.json({
        results: songs
      });
    })
    .catch(function(err) {
      res.status(500).send('500 interal server error');
    });
};

exports.fetchSong = function(req, res) {
};

exports.createSong = function(req, res) {
};

exports.updateSong = function(req, res) {
};

exports.deleteSong = function(req, res) {
};

exports.render404 = function(req, res) {
  res.status(404).send('404 not found');
};
