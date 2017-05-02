var mongoose = require('mongoose');

var songSchema = mongoose.model('Song').schema;

var playlistSchema = new mongoose.Schema(
  {
    name: String,
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
      }
    ]
  },
  {
    timestamps: true
  }
);

var Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
