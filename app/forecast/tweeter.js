var cronJob = require('cron').CronJob;
var Twit = require('twit')
var Entities = require('html-entities').AllHtmlEntities;
var truncate = require('truncate');
var moment = require('moment');

var forecastRepository = require(__dirname + '/repository.js');
var logger = require(__dirname + '/logger.js');

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
                        logger.info("Will tweet, LTT " + formatDate(lastTweetTime) + " < LUT " + formatDate(lastUpdatedTime));
                        lastTweetTime = lastUpdatedTime;
                        forecastRepository.findAll(function (error, forecasts) {
                            for (var i = 0; i < forecasts.length; i++) {
                                var forecast = forecasts[i];
                                tweetForecast(forecast, lastUpdatedTime.format(TWEET_TIME_FORMAT_PATTERN));
                            }
                        });
                    } else {
                        logger.info("Will NOT tweet, LTT " + formatDate(lastTweetTime) + " >= LUT " + formatDate(lastUpdatedTime));
                    }
                } else {
                    logger.error(error);
                }
            });
        }, null, true);
        logger.info("Cron job started, ready to run every 10 minutes.");
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
                consumer_key: 'wSO0T35btyHkqF7IBt2eoiy2D',
                consumer_secret: 'ZssDXAe2jL69suVUcnJ45buiZO6iyi1ZE21CLjClPsvTk9zyv8',
                access_token: '2811785545-WLAD6kSF0wdfLJ8AC2ZM4IzRsV3Wqgcsmil76Nr',
                access_token_secret: '1ovBLfdLl0r0spnngPbJa9oUiYZDUDGcdl9w42jrI5Mho'
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

module.exports.startTweeting = startTweeting;