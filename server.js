var express = require('express');
var forecastTweeter = require(__dirname + '/forecast_tweeter.js');
var forecastProvider = require(__dirname + '/forecast_provider.js');
var areaMapper = require(__dirname + '/area_mapper.js');
var cronJob = require('cron').CronJob;
var fs = require('fs');
var moment = require('moment');
var app = express();
var lastTweetTime = moment();

const TIME_FORMAT_PATTERN = "YYYY-MM-DD, HH:mm:ss:SSS Z";
const TWEET_TIME_FORMAT_PATTERN = "HH:mm";

/**
 * Cron job
 */
try {
    new cronJob('*/5 * * * *', function () {
        forecastProvider.getLastUpdatedTime(function (error, lastUpdatedTime) {
            if (!error) {
                if (lastUpdatedTime.isAfter(lastTweetTime)) {
                    log("Will tweet, LTT " + formatDate(lastTweetTime) + " < LUT " + formatDate(lastUpdatedTime));
                    lastTweetTime = lastUpdatedTime;
                    forecastProvider.findAll(function (forecasts) {
                        for (var i = 0; i < forecasts.length; i++) {
                            var forecast = forecasts[i];
                            sendTweet(forecast, lastUpdatedTime.format(TWEET_TIME_FORMAT_PATTERN));
                        }
                    });
                } else {
                    log("Will NOT tweet, LTT " + formatDate(lastTweetTime) + " >= LUT " + formatDate(lastUpdatedTime));
                }
            } else {
                log(error);
            }
        });
    }, null, true);
    log("Cron job started, ready to run every 5 minutes.");
} catch (ex) {
    log("Cron pattern not valid");
}

/**
 * Web api
 */
app.get("/", function (req, res) {
    res.redirect('/Sjovaderprognos');
})

app.get("/Sjovaderprognos", function (req, res) {
    forecastProvider.findAll(function (forecasts) {
        createAndSendResponse(res, forecasts);
    });
})

app.get("/Sjovaderprognos/:area", function (req, res) {
    var areaKey = req.params.area;
    var areaName = areaMapper.mapForecastKeyToName(areaKey);
    if (typeof areaName === 'undefined') {
        res.send("Oops! Området " + areaKey + " fanns inte prognos för...");
    } else {
        forecastProvider.get(areaName, function (forecast) {
            createAndSendResponse(res, [forecast]);
        });
    }
})

function createAndSendResponse(res, forecasts) {
    createResponse(forecasts, function (response) {
        res.send(response);
    });
}

function createResponse(forecasts, callback) {
    var css = fs.readFileSync("style.css", "utf8");
    var response = "<html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'><title>Sjöväderprognos från SMHI</title><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'><link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Amatic+SC'><style>" + css + "</style></head><body>";
    for (var i = 0; i < forecasts.length; i++) {
        response = response.concat("<p class='forecast'><a href='/Sjovaderprognos/" + forecasts[i].areaKey + "'><span class='area-name'>" + forecasts[i].areaName + "</span><br/><span class='forecast-text'>\"" + forecasts[i].forecast + "\"</span></a></p>")
    }
    if (forecasts.length <= 1) {
        response = response.concat("<p class='links'><a href='/Sjovaderprognos'>Alla</a>");
        forecastProvider.findAll(function (forecasts) {
            for (var i = 0; i < forecasts.length; i++) {
                response = response.concat("<a href='" + forecasts[i].areaKey + "'>" + forecasts[i].areaName + "</a>");
            }
            callback(response.concat("</p></body></html>"));
        });
    } else {
        callback(response.concat("</p></body></html>"));
    }
}

function sendTweet(forecast, lastUpdatedTime) {
    forecastTweeter.tweet(forecast, lastUpdatedTime);
}

function log(logMessage) {
    return console.log(formatDate(moment()) + " " + logMessage);
}

function formatDate(moment) {
    return moment.format(TIME_FORMAT_PATTERN);
}

var port = Number(process.env.app_port || process.env.PORT || 1337);
app.listen(port)

exports = module.exports = app;