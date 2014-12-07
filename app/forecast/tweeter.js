var cronJob = require('cron').CronJob;
var Twit = require('twit')
var Entities = require('html-entities').AllHtmlEntities;
var truncate = require('truncate');
var moment = require('moment');

var forecastRepository = require(__dirname + '/repository.js');
var logger = require(__dirname + '/logger.js');

const TIME_FORMAT_PATTERN = "YYYY-MM-DD, HH:mm:ss:SSS Z";
const TWEET_TIME_FORMAT_PATTERN = "HH:mm";

var featureToggle = true;
var entities = new Entities();
var lastTweetTime = moment();

var startTweeting = function () {
    try {
        new cronJob('*/10 * * * *', function () {
            forecastRepository.getLastUpdatedTime(function (error, lastUpdatedTime) {
                if (!error) {
                    if (lastUpdatedTime.isAfter(lastTweetTime)) {
                        logger.info("Will tweet, LTT " + formatTime(lastTweetTime) + " < LUT " + formatTime(lastUpdatedTime));
                        lastTweetTime = lastUpdatedTime;
                        forecastRepository.findAll(function (error, forecasts) {
                            for (var i = 0; i < forecasts.length; i++) {
                                var forecast = forecasts[i];
                                tweetForecast(forecast, lastUpdatedTime.format(TWEET_TIME_FORMAT_PATTERN));
                            }
                        });
                    } else {
                        logger.info("Will NOT tweet, LTT " + formatTime(lastTweetTime) + " >= LUT " + formatTime(lastUpdatedTime));
                    }
                } else {
                    logger.error(error);
                }
            });
        }, null, true);
        logger.info("Tweeting started and will run cron job every 10 minutes.");
    } catch (ex) {
        logger.error("Cron pattern not valid");
    }
}

function tweetForecast(forecast, formattedLastUpdatedTime) {
    if (forecast.areaKey === 'NorraOstersjon') {
        if (featureToggle) {
            var tweet = createTweetText(forecast, formattedLastUpdatedTime);
            logger.info("### Tweeting: " + tweet);

            var T = new Twit({
                consumer_key: process.env.twitter_consumer_key,
                consumer_secret: process.env.twitter_consumer_secret,
                access_token: process.env.twitter_access_token,
                access_token_secret: process.env.twitter_access_token_secret
            });

            T.post('statuses/update', { status: tweet }, function (error, data, response) {
                if (!error) {
                    logger.info(data)
                } else {
                    logger.error(error);
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

function formatTime(moment) {
    return moment.format(TIME_FORMAT_PATTERN);
}

module.exports.startTweeting = startTweeting;