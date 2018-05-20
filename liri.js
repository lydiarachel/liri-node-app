//import and config dotenv, Twitter, node-Spotify, and request for OMDB NPM packages. also import keys.js file. 
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');
//NPM Package that Reads the random.txt file
var fs = require('fs-extra');

//access the Spotify and Twitter keys and tokens
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commandEntered = process.argv[2];
var songMovie = process.argv[3];

// divider will be used as a spacer between the tv data we print in log.txt
var divider =
    "\n------------------------------------------------------------\n\n";

if (commandEntered === 'my-tweets') {
    tweets();
} else if (commandEntered === `spotify-this-song`) {
    song(songMovie);
} else if (commandEntered === 'movie-this') {
    omdbMovie(songMovie);
} else if (commandEntered === 'do-what-it-says') {
    doSays();
}

//Twitter Function 
function tweets() {
    if (songMovie == undefined) {
        songMovie = "chipotle"
    }
    var params = {
        screen_name: songMovie
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log("---------------------------------------------------")
                console.log(tweets[i].text);
            }
        }
    });
}
//Do what It Says
function doSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        var theArray = data.split(',');
        console.log(theArray);
        spotify.search({
                type: 'track',
                query: theArray[1],
                limit: 5
            },
            function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                } else {
                    var datainc = data.tracks.items[0]
                    console.log("---------------------------------------------------")
                    console.log("Artist: " + datainc.album.artists[0].name);
                    console.log("Song Name: " + datainc.name);
                    console.log("Preview Link: " + datainc.album.preview_url);
                    console.log("Album Name: " + datainc.album.name);
                }
            }
        )
    })
}
//Spotify Function 
function song(searchsong) {
    spotify.search({
        type: 'track',
        query: searchsong
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var datainc = data.tracks.items[0]
        console.log("---------------------------------------------------");
        console.log("Artist: " + datainc.album.artists[0].name);
        console.log("Song Name: " + datainc.name);
        console.log("Preview Link: " + datainc.album.preview_url);
        console.log("Album Name: " + datainc.album.name);
    });
};


//OMDB Function 
function omdbMovie(movieEntered) {
    var divider =
        "\n------------------------------------------------------------\n\n";

    var queryURL = "http://www.omdbapi.com/?t=" + movieEntered + "&y=&plot=short&apikey=trilogy"
    // Run a request to the OMDB API with the movie specified
    request(queryURL, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                var movieBody = JSON.parse(body);
                // Parse the body of the site and recover 
                var movieData = [
                    "Title of the movie: " + movieBody.Title,
                    "Year the movie came out: " + movieBody.Year,
                    "IMDB Rating of the movie: " + movieBody.imdbRating,
                    "Rotten Tomatoes Rating of the movie: " + movieBody.Ratings[1].value,
                    "Country where the movie was produced: " + movieBody.Country,
                    "Language of the movie: " + movieBody.Language,
                    "Plot of the movie: " + movieBody.Plot,
                    "Actors in the movie: " + movieBody.Actors,
                ].join("\n\n");
                //     // Append showData and the divider to log.txt, print data to the console
                fs.appendFile('log.txt', movieData + divider, function (err) {
                    if (err) throw err;
                    console.log(movieData);
                });
            };
    });
};