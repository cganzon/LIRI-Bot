# LIRI Bot

1. This project uses Node.js, various NPM packages, and various API's to allow the user to request some information on an artist's next concert, a song, or a movie. The user is first prompted with what command they wish to use, either "concert-this", "spotify-this-song", "movie-this", or "do-what-it-says". In the case of the "do-what-it-says" command, the text from the random.txt file will be interpreted and the appropirate API call will be made. After the user inputs the command that they want to use, they are able to input any artist, song, or movie that they want to get information from. If the user does not input a song or movie name, information about a default movie or song will be displayed in the console.

2. Technologies used
    * Node.js
    * NPM Packages:
        *   axios
        *   node-spotify-api
        *   moment
        *   inquirer
    *   Bands in Town API
    *   OMDB API

3. [Click here](https://drive.google.com/open?id=1d5dSigLPyAASJi1iqyAufysW3ACLtKhg) to see a demo of the app.

4. Note: If you would like to download this repository and try the app for yourself, you will need get your own Spotify API key if you want to use the "spotify-this-song" command.