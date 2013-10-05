var util    = require('util'),
	twitter = require('ntwitter');
module.exports = new twitter(require('./Config').twitter);