var db = require('../app/config');
var Song = require('../models/song');

exports.fetchSongs = function(req, res) {
  Song.find().exec()
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
  Song.findById(req.params.id).exec()
    .then(function(song) {
      if (!song) {
        res.status(404).send('404 song not found');
      } else {
        res.json(song);
      }
    });
};

exports.createSong = function(req, res) {
  Song.create(req.body)
    .then(function(newSong) {
      res.json(newSong);
    });
};

exports.updateSong = function(req, res) {
  Song.findByIdAndUpdate(req.params.id, req.body, { new: true}).exec()
    .then(function(updatedSong) {
      res.json(updatedSong);
    });
};

exports.deleteSong = function(req, res) {
  Song.findByIdAndRemove(req.params.id).exec()
    .then(function(removedSong) {
      res.json(removedSong);
    });
};

exports.render404 = function(req, res) {
  res.status(404).send('404 not found');
};
