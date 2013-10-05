var mongoose = require('mongoose');

var twitter_schema = mongoose.Schema(
{ created_at: String,
  id: String,
  id_str: String,
  text: String,
  source: String,
  truncated: Boolean,
  in_reply_to_status_id: String,
  in_reply_to_status_id_str: String,
  in_reply_to_user_id: String,
  in_reply_to_user_id_str: String,
  in_reply_to_screen_name: String,
  user:
   { id: String,
     id_str: String,
     name: String,
     screen_name: String,
     location: String,
     url: String,
     description: String,
     protected: Boolean,
     followers_count: String,
     friends_count: String,
     listed_count: String,
     created_at: String,
     favourites_count: String,
     utc_offset: String,
     time_zone: String,
     geo_enabled: Boolean,
     verified: Boolean,
     statuses_count: String,
     lang: String,
     contributors_enabled: Boolean,
     is_translator: Boolean,
     profile_background_color: String,
     profile_background_image_url: String,
     profile_background_image_url_https: String,
     profile_background_tile: Boolean,
     profile_image_url: String,
     profile_image_url_https: String,
     profile_banner_url: String,
     profile_link_color: String,
     profile_sidebar_border_color: String,
     profile_sidebar_fill_color: String,
     profile_text_color: String,
     profile_use_background_image: Boolean,
     default_profile: Boolean,
     default_profile_image: Boolean,
     following: Boolean,
     follow_request_sent: Boolean,
     notifications: Boolean
   },
  coordinates: Array,
  place: Object,
  contributors: Object,
  retweet_count: String,
  favorite_count: String,
  entities:
   {
    hashtags: Array,
    symbols: Array,
    urls: Array,
    user_mentions: Array,
    media: Array
   },
  favorited: Boolean,
  retweeted: Boolean,
  possibly_sensitive: Boolean,
  filter_level: String,
  lang: String
})

module.exports = mongoose.model('Tweet', twitter_schema)