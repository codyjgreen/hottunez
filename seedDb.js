var Promise = require('bluebird');
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
    album: "One in a Million",
    title: "If Your Girl Only Knew",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F05%20If%20Your%20Girl%20Only%20Knew.mp3"
  },
    {
    artist: "Aaliyah",
    album: "I Care 4 U",
    title: "Are You That Somebody",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/I%20Care%204%20U%2F02%20Are%20You%20That%20Somebody.mp3"
  },
  {
    artist: "Aaliyah",
    album: "One in a Million",
    title: "4 Page Letter",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/One%20In%20a%20Million%2F08%204%20Page%20Letter.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Age Ain't Nothing but a Number",
    title: "Back and Forth",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Age%20Ain't%20Nothing%20but%20a%20Number%2F03%20Back%20and%20Forth.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Everything's Gonna Be Alright",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F09%20Everything's%20Gonna%20Be%20Alright.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "We Need A Resolution",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F11%20We%20Need%20A%20Resolution.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Choosey Lover",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F07%20Choosey%20Lover%20%5BOld%20School_New%20School%5D.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Hot Like Fire",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F05%20Hot%20Like%20Fire.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Age Ain't Nothing But A Number",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F03%20Age%20Ain't%20Nothing%20But%20A%20Number.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Rock The Boat",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F12%20Rock%20The%20Boat.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "More Than A Woman",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F14%20More%20Than%20A%20Woman.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "Read Between The Lines",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F15%20Read%20Between%20The%20Lines.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 1",
    title: "It's Whatever",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%201%2F16%20It's%20Whatever.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 2",
    title: "Back & Forth [Mr. Lee & R. Kelly's Remix]",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%202%2F01%20Back%20%26%20Forth%20%5BMr.%20Lee%20%26%20R.%20Kelly's%20Remix%5D.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 2",
    title: "Are You Ready",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%202%2F02%20Are%20You%20Ready_%20%5BSunset%20Park%20Soundtrack%5D.mp3"
  },
  {
    artist: "Aaliyah",
    album: "Best Of Aaliyah Disc 2",
    title: "You Won't See Me Tonight ft. Nas",
    url: "https://s3-us-west-1.amazonaws.com/hr-mytunes/data/Baby%20Girl_%20Best%20Of%20Aaliyah%20Disc%202%2F10%20You%20Won't%20See%20Me%20Tonight%20W_%20Nas%20%5B_I%20Am_%20Album%5D.mp3"
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

seedDb();
