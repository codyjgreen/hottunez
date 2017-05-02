var db = require('../app/config');
var Song = require('../models/song');
var Playlist = require('../models/playlist');

exports.fetchSongs = function(req, res) {
  Song.find()
    .exec()
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
  Song.findById(req.params.id)
    .exec()
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
  Song.findByIdAndUpdate(req.params.id, req.body, { new: true})
    .exec()
    .then(function(updatedSong) {
      res.json(updatedSong);
    });
};

exports.deleteSong = function(req, res) {
  Song.findByIdAndRemove(req.params.id)
    .exec()
    .then(function(removedSong) {
      res.json(removedSong);
    });
};

exports.fetchPlaylists = function(req, res) {
  Playlist.find().populate('songs')
    .exec()
    .then(function(playlists) {
      res.json({
        results: playlists
      });
    });
};

exports.fetchPlaylist = function(req, res) {
  Playlist.findById(req.params.id)
    .populate('songs')
    .exec()
    .then(function(playlist) {
      if (!playlist) {
        res.status(404).send('404 playlist not found');
      } else {
        res.json(playlist);
      }
    });
}

exports.createPlaylist = function(req, res) {
  var playlist = new Playlist({ name: req.body.name });

  req.body.songs.forEach(function(songId) {
    playlist.songs.push(songId);
  });

  playlist.save()
    .then(function(newPlaylist) {
      res.json(newPlaylist);
    });
};

exports.updatePlaylist = function(req, res) {
  Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('songs')
    .exec()
    .then(function(updatedPlaylist) {
      res.json(updatedPlaylist);
    });
};

exports.deletePlaylist = function(req, res) {
  Playlist.findByIdAndRemove(req.params.id)
    .populate('songs')
    .exec()
    .then(function(playlist) {
      res.json(playlist);
    });
};

exports.render404 = function(req, res) {
  res.status(404).send('404 not found');
};
