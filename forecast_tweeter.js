var Twit = require('twit')

var tweetForecast = function (areaKey, forecast) {
    console.log("### Tweeting: " + areaKey + ": " + forecast);
}

module.exports.tweet = tweetForecast;