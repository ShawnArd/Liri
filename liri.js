require("dotenv").config();
var inquirer = require("inquirer")

var Spotify = require('node-spotify-api')
var axios = require('axios')
var moment = require('moment')

var keys = require("./keys")

var omdb = new Omdb(keys.omdb)
var spotify = new Spotify(keys.spotify)
var bands = new Bands(keys.bands)

var userChoice = process.argv[2]

var userInput = ""
for(let i=3; i < process.argv.length; i++) {
userInput +=process.argv[i]+"+";
}
userInput = userInput.trim();

switch(userChoice) {
    case "concert-this":
        concert(userInput)
        break;
    case "spotify-this-song":
        songs(userInput)
        break;
    case "movie-this":
        movie(userInput)
        break;
    case "do-what-it-says":
        console.log("whatevs")
        break;
    default: break;
}

function concert(choice) {

}


function songs(choice) {
   //sets a defult song 
    if (!choice){
        choice = 'The Sign';
    }
    //seaches Spotify API
    spotify.search({ type: 'track', query: choice }, function(err, response) {
        if (err){
            console.log('Error occurred: ' + err);
            return;
        }

        //logs results
        var song = response.tracks.items;
        console.log("Artist: " + song[0].artists[0].name);
        console.log("Song: " + song[0].name);
        console.log("Preview: " + song[0].preview_url);
        console.log("Album: " + song[0].album.name);
});
}



function movie(choice) {

}