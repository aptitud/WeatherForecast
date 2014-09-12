var request = require('request');
var areaMapper = require(__dirname + '/area_mapper.js');

const FORECAST_PROVIDER_URL = "http://www.smhi.se/weatherSMHI2/sjovader/sjovader_data_sv.js";

var findAllForecasts = function (callback) {
    request(FORECAST_PROVIDER_URL, function (error, response, scrapedForecasts) {
        if (!error) {
            callback(parseForecastsFromJS(scrapedForecasts));
        }
    })
}

function parseForecastsFromJS(scrapedForecasts) {
    var forecasts = [];

    var scrapedForecastsArray = scrapedForecasts.split("\n").map(function (val) {
        return val.substring(val.lastIndexOf('="') + 2, val.lastIndexOf('";'));
    });

    for (var i = 0; i < scrapedForecastsArray.length; i += 2) {
        var areaName = scrapedForecastsArray[i];
        if (areaName != '') {
            var areaKey = areaMapper.mapForecastNameToKey(areaName);
            var forecastText = scrapedForecastsArray[i + 1];
            var forecast = {
                areaKey: areaKey,
                areaName: areaName,
                forecast: forecastText
            };
            forecasts.push(forecast);
        }
    }

    return forecasts;
}

var getForecast = function (areaName, callback) {
    findAllForecasts(function (forecasts) {
        for (var i = 0; i < forecasts.length; i++) {
            var forecast = forecasts[i];
            if (forecast.areaName === areaName) {
                callback(forecast);
            }
        }
    });
}

module.exports.findAll = findAllForecasts;
module.exports.get = getForecast;