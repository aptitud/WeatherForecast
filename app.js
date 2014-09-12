var express = require('express');
var forecastProvider = require(__dirname + '/forecast_provider.js');
var areaMapper = require(__dirname + '/area_mapper.js');
var cronJob = require('cron').CronJob;
var app = express();

/**
 * Cron job
 */
new cronJob('0 0-59 * * * *', function () {
    forecastProvider.findAll(function (forecasts) {
        console.log(forecasts);
    });
}, null, true);

/**
 * Web api
 */
app.get("/SeaWeatherForecast", function (req, res) {
    forecastProvider.findAll(function (forecasts) {
        res.send(createResponse(forecasts));
    });
})

app.get("/SeaWeatherForecast/:area", function (req, res) {
    var areaKey = req.params.area;
    var areaName = areaMapper.mapForecastKeyToName(areaKey);
    if (typeof areaName === 'undefined') {
        res.send("Oops! Området " + areaKey + " fanns inte prognos för...");
    } else {
        forecastProvider.get(areaName, function (forecast) {
            res.send(createResponse([forecast]));
        });
    }
})

function createResponse(forecasts) {
    var response = "";
    for (var i = 0; i < forecasts.length; i++) {
        var areaName = forecasts[i].areaName;
        var forecast = forecasts[i].forecast;
        response = response.concat("<p><b>" + areaName + "</b><br/>" + forecast + "</p>")
    }
    return response;
}

function sendTweet(forecastHeader, forecastText) {
    // TODO: Send tweet to correct Twitter account
}

app.listen(8080)

exports = module.exports = app;