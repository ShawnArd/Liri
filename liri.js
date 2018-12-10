//made with the assistance of Shayne Officer
require("dotenv").config();
var inquirer = require("inquirer")

var Spotify = require('node-spotify-api')
var axios = require('axios')
var moment = require('moment')

var keys = require("./keys")


var spotify = new Spotify(keys.spotify)


var userChoice = process.argv[2]

var userInput = ""
for(let i=3; i < process.argv.length; i++) {
userInput +=process.argv[i]+"+";
}
//this cuts the end + off
userInput = userInput.slice(0,-1);

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
    console.log("concerts")
    axios.get("https://rest.bandsintown.com/artists/"+choice+"/events?app_id="+keys.bands.id).then(
    
        function(response, err) {
            var concerts = response.data;
            // console.log(concerts)
            var list = "";
            for (var i = 0; i < concerts.length - 1; i++) {
                //uses the moments to format date
                var date = moment(concerts[i].datetime).format("MM/DD/YYYY");
                //creates a string and seperates them
                list += concerts[i].venue.name +", "+ concerts[i].venue.city+", "+ date+ "\n"
            }
            console.log(list);


        })


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
    //sets default Choice
    if (!choice) {
        choice ="Mr Nobody"
    }
        axios.get("http://www.omdbapi.com/?t="+choice+"&y=&plot=short&apikey="+keys.omdb.id).then(
    
    function(response, err) {
        //collects response data
        var movie = response.data

        //if no error console reponse
    if (!err) {
        // console.log(response)

        console.log("Title: " + movie.Title);
        console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.imdbRating);
        console.log("Rotten Tomatoes Rating: " + movie.Ratings);
        console.log("Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
    }
});

}

// function doWhatItSays() {
// 	fs.readFile('random.txt', "utf8", function(error, data){

// 		if (error) {
//     		return console.log(error);
//   		}

// 		// Then split it by commas (to make it more readable)
// 		var dataArr = data.split(",");

// 		// Each command is represented. Because of the format in the txt file, remove the quotes to run these commands. 
// 		if (dataArr[0] === "spotify-this-song") {
// 			var songcheck = dataArr[1].slice(1, -1);
// 			spotify(songcheck);
		
		
//   	});

// };