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
console.log(userInput);

// ============================================== //

if (command === "concert-this") {

};

if (command === "spotify-this-song") {

};

if (command === "movie-this") {
    axios
        .get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            // console.log(response.data);
            console.log("Movie: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log(response.data.Ratings[0].Source + " Score: " + response.data.Ratings[0].Value);
            console.log(response.data.Ratings[1].Source + " Score: " + response.data.Ratings[1].Value);
            console.log("Country produced: " + response.data.Country);
            console.log("Language(s): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
};

if (command === "do-what-it-says") {

};
