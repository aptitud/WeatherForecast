var express = require('express');
var forecastTweeter = require(__dirname + '/forecast_tweeter.js');
var forecastProvider = require(__dirname + '/forecast_provider.js');
var areaMapper = require(__dirname + '/area_mapper.js');
var cronJob = require('cron').CronJob;
var fs = require('fs');
var moment = require('moment');
var app = express();
var lastTweetTime = moment();

/**
 * Cron job
 */
new cronJob('0 0-59 * * * *', function () {
    forecastProvider.getLastUpdatedTime(function (error, lastUpdatedTime) {
        if (lastUpdatedTime.isAfter(lastTweetTime)) {
            if (!error) {
                console.log("Will tweet because last tweet time: " + lastTweetTime + " is older than last updated time: " + lastUpdatedTime);
                forecastProvider.findAll(function (forecasts) {
                    for (var i = 0; i < forecasts.length; i++) {
                        var forecast = forecasts[i];
                        if (forecast.areaKey === 'NorraOstersjon') {
                            sendTweet(forecast.areaKey, forecast.forecast);
                        }
                    }
                });
            } else {
                console.log(error);
            }
        } else {
            console.log("Will not tweet because last tweet time: " + lastTweetTime + " is more recent than last updated time: " + lastUpdatedTime);
        }
    });
}, null, true);

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

function sendTweet(areaKey, forecast) {
    forecastTweeter.tweet(areaKey, forecast);
}

var port = Number(process.env.PORT || 8080);
app.listen(port)

exports = module.exports = app;