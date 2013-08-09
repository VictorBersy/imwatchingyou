What is it ?
============

ImWatchingYou saves every tweet and picture uploaded on pic.twitter.com in a database and a specific folder.
This is my first project with NodeJS and Mongoose, it's a bit messy, I'll do my best to tidy it. 

Install
=======

You need to install MongoDB to use this script. Report to [the documentation.](http://www.mongodb.org/downloads).

First, clone this repo :

    git clone git@github.com:VictorBersy/imwatchingyou.git

Move in this folder and install dependencies with : 

    npm install ntwitter colors mongoose http-get fs path


Config
======

You've two files to edit :
config.js and twitter_keys.json

### config.js
Edit this line with your host and your database :

    mongoose.connect('mongodb://localhost/imwatchingyou');

### keys_twitter.json

You have to create an application on [dev.twitter.com](https://dev.twitter.com/) and copy paste your keys here :
````
{
    "consumer_key":        "YOUR_CONSUMER_TOKEN",
    "consumer_secret":     "YOUR_CONSUMER_SECRET",
    "access_token_key":    "YOUR_ACCESS_TOKEN_KEY",
    "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
}
````

Run
===

    npm start    


You can create a screen (screen -S imwatchingyou) to run it on background. 

Bugs
====

* The script stops randomly, I'm investigating. 