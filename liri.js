// Reads and sets any environment variables with the dotenv package:
require("dotenv").config();

// Importing the keys.js file
const keys = require("./keys.js");

// Grabbing packages
const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const inquirer = require("inquirer");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
// console.log(spotify.credentials);
// console.log("ID: " + spotify.credentials.id);
// console.log("Secret: " + spotify.credentials.secret);

// ================================================ //

// Function to display venue data
const venueData = (venue) => {
    // console.log(venue.data[0]);
    console.log("==============================");
    console.log("Artist: " + venue.data[0].lineup[0]);
    console.log("Venue: " + venue.data[0].venue.name);
    console.log("Location: " + venue.data[0].venue.city + ", " + venue.data[0].venue.region + " " + venue.data[0].venue.country);
    var dateTime = venue.data[0].datetime;
    var formatted = moment(dateTime).format("MM/DD/YY, hh:mm a");
    // console.log("Date: " + venue.data[0].datetime);
    console.log("Date and Time: " + formatted);
    console.log("==============================");

};

// Function to display song data
const songData = (song) => {
    // console.log(song.tracks.items[0]);
    console.log("==============================");
    console.log("Song name: " + song.tracks.items[0].name);
    console.log("Artist(s): " + song.tracks.items[0].album.artists[0].name);
    console.log("Album: " + song.tracks.items[0].album.name);
    console.log("Preview Link: " + song.tracks.items[0].external_urls.spotify);
    console.log("==============================");
};

// Function display necessary movie data
const movieData = (movie) => {
    // console.log(movie.data);
    console.log("==============================");
    console.log("Movie: " + movie.data.Title);
    console.log("Release Year: " + movie.data.Year);
    console.log(movie.data.Ratings[0].Source + " Score: " + movie.data.Ratings[0].Value);
    console.log(movie.data.Ratings[1].Source + " Score: " + movie.data.Ratings[1].Value);
    console.log("Country produced: " + movie.data.Country);
    console.log("Language(s): " + movie.data.Language);
    console.log("Plot: " + movie.data.Plot);
    console.log("Actors: " + movie.data.Actors);
    console.log("==============================");
};

// ================================================ //

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
            message: "Enter an artist, song, or movie (press Enter otherwise)",
            name: "userInput"
        }
    ])
    .then(function (response) {

        if (response.command === "concert-this") {
            axios
                .get("https://rest.bandsintown.com/artists/" + response.userInput + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    venueData(response);
                });
        };

        // ================================================ //

        if (response.command === "spotify-this-song") {
            // If user input is empty
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
            // If user input is empty
            if (response.userInput === "") {
                axios
                    .get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy")
                    .then(function (response) {
                        movieData(response);
                    });
            } else {
                axios
                    .get("http://www.omdbapi.com/?t=" + response.userInput + "&y=&plot=short&apikey=trilogy")
                    .then(function (response) {
                        movieData(response);
                    });
            };

        };

        // ================================================ //

        if (response.command === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                // console.log(data);
                var randomArray = data.split(",");
                // console.log(randomArray);
                var randomCommand = randomArray[0];
                var randomInput = randomArray[1];

                if (randomCommand === "spotify-this-song") {
                    spotify
                        .search({ type: 'track', query: randomInput }, function (error, response) {
                            if (error) {
                                return console.log('Error occurred: ' + error);
                            };
                            console.log("Here's a random song!")
                            songData(response);
                        });
                };

                if (randomCommand === "concert-this") {
                    axios
                        .get("https://rest.bandsintown.com/artists/" + randomInput + "/events?app_id=codingbootcamp")
                        .then(function (response) {
                            console.log("Here's the next concert for a random artist!")
                            venueData(response);
                        });
                };

                if (randomCommand === "movie-this") {
                    axios
                        .get("http://www.omdbapi.com/?t=" + randomInput + "&y=&plot=short&apikey=trilogy")
                        .then(function (response) {
                            console.log("Here's a random movie!")
                            movieData(response);
                        });
                };
            });
        };

    });

