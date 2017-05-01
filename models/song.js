var mongoose = require('mongoose');

var songSchema = new mongoose.Schema(
  {
    artist: String,
    title: String,
    album: String,
    url: String
  },
  {
    timestamps: true
  }
);

var Song = mongoose.model('Song', songSchema);

module.exports = Song;
