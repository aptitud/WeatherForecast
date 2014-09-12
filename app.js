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
    var response = "<html><head><title>Sjöväderprognos</title><style>body { background-color: #000033; color: #e5e5f2; font-family: 'Trebuchet MS', Helvetica, sans-serif; font-size: 10px } .forecast { margin-bottom: 20px; padding: 10px; } .area-name { font-size: 5em; font-weight: bold } .forecast-text { font-size: 3.5em; }</style></head><body>";
    for (var i = 0; i < forecasts.length; i++) {
        response = response.concat("<p class='forecast'><span class='area-name'>" + forecasts[i].areaName + "</span><br/><span class='forecast-text'>" + forecasts[i].forecast + "</span>")
    }
    return response.concat("</body></html>");
}

function sendTweet(forecastHeader, forecastText) {
    // TODO: Send tweet to correct Twitter account
}

app.listen(8080)

exports = module.exports = app;