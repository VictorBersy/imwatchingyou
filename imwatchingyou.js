// Required
var Config   = require('./config/Config.json');
var Twitter  = require('./config/Twitter.js')
var Mongo    = require('./config/Mongo.js')
var Util     = require('util')
var Colors   = require('colors')
var FS       = require('fs')
var PathUtil = require('path')
var Http     = require('http-get')
//

Mongo.db.on('error', console.error.bind(console, 'connection error:'));
Mongo.db.once('open', function callback () {
	console.log('Mongoose : OK'.green);
	checkTwitterOk();
});

function checkTwitterOk() {
	Twitter.verifyCredentials(function (err, data) {
		if (err) {
			console.error(err);
		}
		else {
			var welcomeMessage = 'Logged as ' + data.name + ' (' + data.screen_name + ')';
			console.log(welcomeMessage.cyan);
			initStream();
		}
	});
};

function initStream () {
	Twitter.stream('user', {'with':'followings'}, function(stream) {
		console.log('Stream : OK'.green);
		console.log('Waiting for a new tweet...'.green);
		stream.on('data', function (data) {
			if (data.text !== undefined) {
				displayStream(data);
				saveStream(data);
			}
		});
		stream.on('end', function (response) {
			console.log("Disconnection detected. Initializing a new stream...")
			console.log(response.red);
  			checkTwitterOk();
		});
		stream.on('destroy', function (response) {
			console.log("Silent disconnection detected. Initializing a new stream...")
			console.log(response.red);
  			checkTwitterOk();
		});
		stream.on('error', function (response) {
			console.log("Error detected. Initializing a new stream...")
			console.log(response.red);
  			checkTwitterOk();
		});
	});
}

function displayStream(data) {
	// Display in console [DATE] @XXXXX : TWEET
	var date  = data.created_at
	var user  = data.user.screen_name
	var tweet = data.text
	// Format like we want
	var f_date  = '[' + date + '] : '
	var f_user  = '@' + user
	var f_tweet = ' ' + tweet
	console.log(f_date.bold.white + f_user.cyan + f_tweet.yellow)
}

function saveStream(data) {
	var tweet = new Mongo.Tweet({
			created_at: data.created_at,
			id: data.id,
			id_str: data.id_str,
			text: data.text,
			source: data.source,
			truncated: data.truncated,
			in_reply_to_status_id: data.in_reply_to_status_id,
			in_reply_to_status_id_str: data.in_reply_to_status_id_str,
			in_reply_to_user_id: data.in_reply_to_user_id,
			in_reply_to_user_id_str: data.in_reply_to_user_id_str,
			in_reply_to_screen_name: data.in_reply_to_screen_name,
			user : {
				id: data.user.id,
				id_str: data.user.id_str,
				name: data.user.name,
				screen_name: data.user.screen_name,
				location: data.user.location,
				url: data.user.url,
				description: data.user.description,
				protected: data.user.protected,
				followers_count: data.user.followers_count,
				friends_count: data.user.friends_count,
				listed_count: data.user.listed_count,
				created_at: data.user.created_at,
				favourites_count: data.user.favourites_count,
				utc_offset: data.user.utc_offset,
				time_zone: data.user.time_zone,
				geo_enabled: data.user.geo_enabled,
				verified: data.user.verified,
				statuses_count: data.user.statuses_count,
				lang: data.user.lang,
				contributors_enabled: data.user.contributors_enabled,
				is_translator: data.user.is_translator,
				profile_background_color: data.user.profile_background_color,
				profile_background_image_url: data.user.profile_background_image_url,
				profile_background_image_url_https: data.user.profile_background_image_url_https,
				profile_background_tile: data.user.profile_background_tile,
				profile_image_url: data.user.profile_image_url,
				profile_image_url_https: data.user.profile_image_url_https,
				profile_banner_url: data.user.profile_banner_url,
				profile_link_color: data.user.profile_link_color,
				profile_sidebar_border_color: data.user.profile_sidebar_border_color,
				profile_sidebar_fill_color: data.user.profile_sidebar_fill_color,
				profile_text_color: data.user.profile_text_color,
				profile_use_background_image: data.user.profile_use_background_image,
				default_profile: data.user.default_profile,
				default_profile_image: data.user.default_profile_image,
				following: data.user.following,
				follow_request_sent: data.user.follow_request_sent,
				notifications: data.user.notifications
			},
			coordinates: data.coordinates,
			place: data.place,
			contributors: data.contributors,
			retweet_count: data.retweet_count,
			favorite_count: data.favorite_count,
			entities: {
				hashtags: data.entities.hashtags,
				symbols: data.entities.symbols,
				urls: data.entities.urls,
				user_mentions: data.entities.user_mentions,
				media: data.entities.media
			},
			favorited: data.favorited,
			retweeted: data.retweeted,
			possibly_sensitive: data.possibly_sensitive,
			filter_level: data.filter_level,
			lang: data.lang
		})
	tweet.save(function (err, tweet) {
	  if (err) {
	  	console.log(err.red)
	  }
	});
	if (data.entities.media !== undefined) {
		saveMedia(data.entities.media, data.user)
	}
}

function saveMedia(medias, user) {
	medias.forEach(function (media) { // foreach medias posted
		var mediaLink   = media.media_url_https + ':large'; // we add :large to get a better quality
		var base_folder = Config.basePath || './pictures';
		var path_folder = PathUtil.join(base_folder, user.screen_name);

		// Verify if base folder exists (basefolder = BASEFOLDER/usernameTwitter/pic.jpg)
		FS.exists(base_folder, function(exists) {
			// if the folder where we should save images doesn't exists (the one with the username)
			if(!exists) {
				// we create it
				FS.mkdir(base_folder, function(err) {
					if(err) {
						console.error(base_folder);
						console.error(err.red);
					}
				});
			}
		});

		FS.exists(path_folder, function(exists) {
			// if the folder where we should save images doesn't exists (the one with the username)
			if(!exists) {
				// we create it
				FS.mkdir(path_folder, function(err) {
					if(err) {
						console.error(path_folder);
						console.error(err.red);
					}
					// or we download the file in it
					else {
						download();
					}
				});
			}
			else {
				download();
			}
		});

		function download() {
			var path = PathUtil.join(path_folder, media.id_str + '.jpg');
			Http.get(mediaLink, path, function (error, result) { // Function to save this image
				if (error) {
					console.error(error.red);
				}
				else {
					console.log('File downloaded at: ' + result.file.green);
				}
			});
		}
	});
}