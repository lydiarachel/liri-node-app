# LIRI Bot
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## What Each Command Does 
**node liri.js my-tweets**
This will show your last 20 tweets and when they were created at in your terminal/bash window.
![Twitter Pic](/images/twitter.png)

**node liri.js spotify-this-song `'<song name here>'`**

This will show the following information about the song in your terminal/bash window

*Artist(s)*
*The song's name*
*A preview link of the song from Spotify*
*The album that the song is from*


If no song is provided then your program will default to "The Sign" by Ace of Base.
![Spotify Pic](/images/Spotify.png)

**node liri.js movie-this `'<movie name here>'`**
This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.


If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
![OMDB Pic](/images/OMDB.png)

**node liri.js do-what-it-says**
Runs spotify-this-song for "I Want it That Way," as follows the text in random.txt.
![dowhatitsays Pic](/images/doWhatItSays.png)



