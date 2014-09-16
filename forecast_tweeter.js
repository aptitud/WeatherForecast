var Twit = require('twit')
var Entities = require('html-entities').AllHtmlEntities;
var truncate = require('truncate');

var featureToggle = true;
entities = new Entities();

var tweetForecast = function (forecast) {
    if (forecast.areaKey === 'NorraOstersjon') {
        console.log("### Tweeting: " + forecast.areaKey + ": " + forecast.forecast);

        if (featureToggle) {
            var tweet = createTweetText(forecast);

            var T = new Twit({
                consumer_key: 'wSO0T35btyHkqF7IBt2eoiy2D',
                consumer_secret: 'ZssDXAe2jL69suVUcnJ45buiZO6iyi1ZE21CLjClPsvTk9zyv8',
                access_token: '2811785545-WLAD6kSF0wdfLJ8AC2ZM4IzRsV3Wqgcsmil76Nr',
                access_token_secret: '1ovBLfdLl0r0spnngPbJa9oUiYZDUDGcdl9w42jrI5Mho'
            });

            T.post('statuses/update', { status: tweet }, function (err, data, response) {
                console.log(data)
            })
        }
    }
}

function createTweetText(forecast) {
    var tweet = forecast.forecast;
    tweet = htmlDecodeTweet(tweet);
    tweet = truncateTweet(tweet);
    tweet = addLink(tweet, forecast.link);
    return  tweet;
}

function htmlDecodeTweet(tweet) {
    return entities.decode(tweet);
}

function truncateTweet(tweet) {
    if (tweet.length > 118) {
        return truncate(tweet, 115)
    } else {
        return tweet;
    }
}

function addLink(tweet, link) {
    return tweet + " " + link;
}

module.exports.tweet = tweetForecast;