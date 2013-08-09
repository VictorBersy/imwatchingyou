/* DATABSE */

var mongoose = require('mongoose')
  , cfg = require('./config');

mongoose.connect(cfg.database.url || 'mongodb://localhost/imwatchingyou'); //mongodb://address/dbName
exports.db = mongoose.connection;

exports.Tweet = require('./mongoose_schemas/twitter.schema.js');