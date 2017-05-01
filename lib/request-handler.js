exports.renderIndex = function(req, res) {
  res.send('You just hit the / route!');
};

exports.fetchSongs = function(req, res) {
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
