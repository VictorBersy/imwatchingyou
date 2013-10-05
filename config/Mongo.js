var mongoose = require('mongoose')
var config   = require('./Config.json');

mongoose.connect(config.mongo.url_database); //mongodb://address/dbName
exports.db = mongoose.connection;

exports.Tweet = require('../mongoose_schemas/twitter.schema.js');