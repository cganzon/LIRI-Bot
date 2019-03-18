// Reads and sets any environment variables with the dotenv package:
require("dotenv").config();

// Importing the keys.js file
var keys = require("./keys.js");
// Grabbing axios package
var axios = require("axios");

// Grabbing user input
var command = process.argv[2];

// Storing all arguments in a variable
var arguments = process.argv;

// Empty variable to hold user's input for searching API's
var userInput = "";

for (var i = 3; i < arguments.length; i++) {

    if (i > 3 && i < arguments.length) {
        userInput = userInput + "+" + arguments[i];
    }
    else {
        userInput += arguments[i];

    }
};
// console.log(userInput);

// ============================================== //

if (command === "concert-this") {

};

if (command === "spotify-this-song") {

};

if (command === "movie-this") {
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

if (command === "do-what-it-says") {

};
