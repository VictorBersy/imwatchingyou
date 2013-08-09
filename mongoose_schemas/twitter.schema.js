var mongoose = require('mongoose');

var twitter_schema = mongoose.Schema({
		data: Object
})

module.exports = mongoose.model('Tweet', twitter_schema)