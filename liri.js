// Reads and sets any environment variables with the dotenv package:
require("dotenv").config();

// Importing the keys.js file
var keys = require("./keys.js");

// Grabbing packages
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// console.log(spotify.credentials);
// console.log("ID: " + spotify.credentials.id);
// console.log("Secret: " + spotify.credentials.secret);
var moment = require("moment");

// Grabbing user input
var command = process.argv[2];

// Storing all arguments in a variable
var arguments = process.argv;

// Empty variable to hold user's input after command argument for searching API's
var userInput = "";

for (var i = 3; i < arguments.length; i++) {

    if (i > 3 && i < arguments.length) {
        userInput = userInput + "+" + arguments[i];
    }
    else {
        userInput += arguments[i];
    };
};
// console.log(userInput);

// ================================================ //

if (command === "concert-this") {

};

// ================================================ //

if (command === "spotify-this-song") {
    // Function to display song data
    function songData(song) {
        // console.log(song.tracks.items[0]);
        console.log("Song name: " + song.tracks.items[0].name);
        console.log("Artist(s): " + song.tracks.items[0].album.artists[0].name);
        console.log("Album: " + song.tracks.items[0].album.name);
        console.log("Preview Link: " + song.tracks.items[0].external_urls.spotify);
    };

    if (userInput === "") {
        spotify
            .search({ type: 'track', query: 'The+Sign+artist:Ace+of+Base' }, function (error, response) {
                if (error) {
                    return console.log('Error occurred: ' + error);
                };

                songData(response);
            });
    } else {
        spotify
            .search({ type: 'track', query: userInput }, function (error, response) {
                if (error) {
                    return console.log('Error occurred: ' + error);
                };

                songData(response);
            });
    };
};

// ================================================ //

if (command === "movie-this") {
    // Function display necessary movie data
    function moveData(movie) {
        console.log(movie.data);
        console.log("Movie: " + movie.data.Title);
        console.log("Release Year: " + movie.data.Year);
        console.log(movie.data.Ratings[0].Source + " Score: " + movie.data.Ratings[0].Value);
        console.log(movie.data.Ratings[1].Source + " Score: " + movie.data.Ratings[1].Value);
        console.log("Country produced: " + movie.data.Country);
        console.log("Language(s): " + movie.data.Language);
        console.log("Plot: " + movie.data.Plot);
        console.log("Actors: " + movie.data.Actors);
    };

    // If user input is empty
    if (userInput === "") {
        axios
            .get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                moveData(response);
            });
    } else {
        axios
            .get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                moveData(response);
            });
    };

};

// ================================================ //

if (command === "do-what-it-says") {

};
