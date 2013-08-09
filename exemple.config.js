global.twitter   = require('ntwitter');
global.colors    = require('colors');
global.mongoose  = require('mongoose');
global.http      = require('http-get');
global.fs        = require('fs');
global.path_util = require('path');

// ----- Mongoose
		mongoose.connect('mongodb://localhost/imwatchingyou'); //mongodb://address/dbName
		var db = mongoose.connection;
		require('./mongoose_schemas/twitter.schema.js');
// ----- Twitter API keys. Edit this file with your own keys.
var twit = new twitter(require('./keys_twitter.json')); // Don't fortget to edit this file !

// Where do you want to save pictures for pic.twitter.com ?
// This is the main folder. One folder will be created for each user who upload a picture.
// basePath/{screen_name_twitter}/{idpicture}.jpg
var basePath = '';