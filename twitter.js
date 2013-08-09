/* TWITTER */

var twitter = require('ntwitter');

module.exports = new twitter(require('./config').twitter);