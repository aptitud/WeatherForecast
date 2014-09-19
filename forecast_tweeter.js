var Twit = require('twit')
var Entities = require('html-entities').AllHtmlEntities;
var truncate = require('truncate');

var featureToggle = true;
entities = new Entities();

var tweetForecast = function (forecast, formattedLastUpdatedTime) {
    if (forecast.areaKey === 'NorraOstersjon') {
        if (featureToggle) {
            var tweet = createTweetText(forecast, formattedLastUpdatedTime);
            console.log("### Tweeting: " + tweet);

            var T = new Twit({
                consumer_key: 'wSO0T35btyHkqF7IBt2eoiy2D',
                consumer_secret: 'ZssDXAe2jL69suVUcnJ45buiZO6iyi1ZE21CLjClPsvTk9zyv8',
                access_token: '2811785545-WLAD6kSF0wdfLJ8AC2ZM4IzRsV3Wqgcsmil76Nr',
                access_token_secret: '1ovBLfdLl0r0spnngPbJa9oUiYZDUDGcdl9w42jrI5Mho'
            });

            T.post('statuses/update', { status: tweet }, function (error, data, response) {
                if (!error) {
                    console.log(data)
                } else {
                    console.log(error);
                }
            })
        }
    }
}

function createTweetText(forecast, formattedLastUpdatedTime) {
    var tweet = forecast.forecast;
    tweet = htmlDecodeTweet(tweet);
    tweet = addTime(tweet, formattedLastUpdatedTime);
    if (tweet.length > 140) {
        tweet = truncateTweet(tweet);
        tweet = addLink(tweet, forecast.link);
    }
    return  tweet;
}

function htmlDecodeTweet(tweet) {
    return entities.decode(tweet);
}

function addTime(tweet, formattedLastUpdatedTime) {
    return formattedLastUpdatedTime + ": " + tweet;
}

function truncateTweet(tweet) {
    if (tweet.length > 118) {
        return truncate(tweet, 114)
    } else {
        return tweet;
    }
}

function addLink(tweet, link) {
    return tweet + " " + link;
}

module.exports.tweet = tweetForecast;