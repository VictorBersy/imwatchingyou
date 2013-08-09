require('./config.js');
// We check if we have an error to connect Mongoose 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { // It's ok, so we start the stream from Twitter
	console.log('Mongoose : OK'.green);
  checkCredentials();
  initStream();
});

function checkCredentials() {
	twit.verifyCredentials(function (err, data) {
		var welcomeMessage = 'Logged as ' + data.name + ' (' + data.screen_name + ')';
	  console.log(welcomeMessage.cyan);
	})
}

function initStream () {
	twit.stream('user', {'with':'followings'}, function(stream) {
	  console.log('Stream : OK'.green);
	  console.log('Waiting for a new tweet !'.green);
	  stream.on('data', function (data) {
	  	if(data.text !== undefined) {
	  		displayStream(data);
	  		saveStream(data);
	    }
	  });
	});
};

function displayStream(data) {
	if (data.entities.media != undefined) {
		console.log("[Media detected !]".rainbow + ' ' + data.user.screen_name.green + ': ' + data.text.red);
	}
	else {
		console.log(data.user.screen_name.green + ': ' + data.text.red);
	}
}

function saveStream(data) {
	var tweet = new Tweet({data: data})
	tweet.save(function (err, tweet) {
	  if (err) {}// TODO handle the error
	});
	if (data.entities.media != undefined) {
		saveMedia(data.entities.media, data.user);
	}
}

function saveMedia(medias, user) {
	medias.forEach(function (media) { // foreach medias posted
		var mediaLink = media.media_url_https + ':large'; // we add :large to get a better quality
		var path_folder = basePath + user.screen_name + '/';
		fs.mkdir(path_util.normalize(path_folder));
		var path = path_util.normalize(path_folder + media.id_str + '.jpg');

		http.get(mediaLink, path, function (error, result) { // Function to save this image
			if (error) {
				console.error(error.red);
			} else {
				console.log('File downloaded at: ' + result.file.green);
			}
		});
	});
}