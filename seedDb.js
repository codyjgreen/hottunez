var db = require('./app/config');
var Song = require('./models/song');
var Playlist = require('./models/playlist');

var data = [
  {
    artist: "Aaliyah",
    album: "One in a Million",
    title: "One in a Million",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F03%20One%20in%20a%20Million.mp3"
  },
  {
    artist: "Aaliyah",
    album: "One ina Million",
    title: "If Your Girl Only Knew",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F05%20If%20Your%20Girl%20Only%20Knew.mp3"
  },
  {
    artist: "Aaliyah",
    album: "One in a Million",
    title: "4 Page Letter",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F08%204%20Page%20Letter.mp3"
  },
  {
    artist: "Aaliyah",
    album: "I Care 4 U",
    title: "Are You That Somebody",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/I%20Care%204%20U%2F02%20Are%20You%20That%20Somebody.mp3"
  }
];

var seedDb = function() {
  Playlist.remove()
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
      console.log('All playlists removed');
    });

  Song.remove()
    .catch(function(err) {
      console.log(err);
    })
    .then(function() {
      console.log('All songs removed!');

      data.forEach(function(song) {
        Song.create(song)
          .then(function(newSong) {
            console.log(`Created song ${newSong.artist} - ${newSong.title}`);
          });
      });
    });
};

module.exports = seedDb;
