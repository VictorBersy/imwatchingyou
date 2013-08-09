var twitter_schema = mongoose.Schema({
		data: Object
})

global.Tweet = mongoose.model('Tweet', twitter_schema)