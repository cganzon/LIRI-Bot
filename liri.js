// Reads and sets any environment variables with the dotenv package:
require("dotenv").config();

// Importing the keys.js file
var keys = require("./keys.js");

// Grabbing packages
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// console.log(spotify.credentials);
// console.log("ID: " + spotify.credentials.id);
// console.log("Secret: " + spotify.credentials.secret);

// Grabbing user's input with inquirer package
inquirer
    .prompt([
        {
            type: "input",
            message: "What do you want to do? (concert-this, spotify-this-song, movie-this, do-what-it-says)",
            name: "command"
        },
        {
            type: "input",
            message: "Enter an artist, song, or movie (press enter if you want a random output)",
            name: "userInput"
        }
    ])
    .then(function (response) {

        if (response.command === "concert-this") {
            axios
                .get("https://rest.bandsintown.com/artists/" + response.userInput + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    // console.log(response.data[0]);
                    console.log("Venue: " + response.data[0].venue.name);
                    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
                    console.log("Date: " + response.data[0].datetime);
                });
        };

        // ================================================ //

        if (response.command === "spotify-this-song") {
            // Function to display song data
            function songData(song) {
                // console.log(song.tracks.items[0]);
                console.log("Song name: " + song.tracks.items[0].name);
                console.log("Artist(s): " + song.tracks.items[0].album.artists[0].name);
                console.log("Album: " + song.tracks.items[0].album.name);
                console.log("Preview Link: " + song.tracks.items[0].external_urls.spotify);
            };

            if (response.userInput === "") {
                spotify
                    .search({ type: 'track', query: 'The+Sign+artist:Ace+of+Base' }, function (error, response) {
                        if (error) {
                            return console.log('Error occurred: ' + error);
                        };

                        songData(response);
                    });
            } else {
                spotify
                    .search({ type: 'track', query: response.userInput }, function (error, response) {
                        if (error) {
                            return console.log('Error occurred: ' + error);
                        };

                        songData(response);
                    });
            };
        };

        // ================================================ //

        if (response.command === "movie-this") {
            // Function display necessary movie data
            function moveData(movie) {
                // console.log(movie.data);
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
            if (response.userInput === "") {
                axios
                    .get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
                    .then(function (response) {
                        moveData(response);
                    });
            } else {
                axios
                    .get("http://www.omdbapi.com/?t=" + response.userInput + "&y=&plot=short&apikey=trilogy")
                    .then(function (response) {
                        moveData(response);
                    });
            };

        };

        // ================================================ //

        if (response.command === "do-what-it-says") {

        };

    });

