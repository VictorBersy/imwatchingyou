What is it ?
============

ImWatchingYou saves every tweet and picture uploaded on pic.twitter.com in a database and a specific folder.

Install
=======

You need to install MongoDB to use this script. Report to [the documentation.](http://www.mongodb.org/downloads).

First, clone this repo :

    git clone https://github.com/VictorBersy/imwatchingyou.git

Move in this folder and install dependencies with [NPM](https://npmjs.org/) :

    npm install

Config
======

You must edit config/example.Config.json

First, you have to create an application on [dev.twitter.com](https://dev.twitter.com/) and copy paste your keys here :
````
{
    "consumer_key":        "YOUR_CONSUMER_TOKEN",
    "consumer_secret":     "YOUR_CONSUMER_SECRET",
    "access_token_key":    "YOUR_ACCESS_TOKEN_KEY",
    "access_token_secret": "YOUR_ACCESS_TOKEN_SECRET"
}
````

Then, edit this line with your host and your database :
By default, mongoose will connect to `mongodb://localhost/imwatchingyou/`
If you want to overide this setting, edit this line :
````
{
    "mongo": {
        "url_database": "mongodb://localhost/imwatchingyou"
    },
````

You can change the directory to save pictures.
By default, it will create a folder at the root of the application called "pictures"
If you want to change it : 
````
{
    "basePath": "/path/to/your/folder/"
}
````


Run
===

    npm start


Note : You can create a screen (screen -S imwatchingyou) to run it on background. 

Contributors
============
[VictorBersy](http://github.com/VictorBersy)
[Sepsten](http://github.com/sepsten)