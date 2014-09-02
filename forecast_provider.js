var request = require('request');
var cheerio = require('cheerio');
var areaMapper = require(__dirname + '/area_mapper.js');

const FORECAST_PROVIDER_URL = "http://www.smhi.se/vadret/hav-och-kust/sjovader/sjovader_tabell_sv.htm";
const AREAS = ["Fladen", "Dogger", "Tyska bukten", "Fiskebankarna", "Syd Utsira", "Skagerack", "Kattegatt och Bälten", "Vänern", "Öresund", "Sydvästra och södra Östersjön", "Sydöstra Östersjön", "Mellersta Östersjön", "Norra Östersjön", "Rigabukten", "Finska viken", "Ålands hav", "Skärgårdshavet", "Bottenhavet", "Norra Kvarken och Bottenviken"];

var findAllForecasts = function (callback) {
    request(FORECAST_PROVIDER_URL, function (error, response, html) {
        if (!error) {
            var forecasts = [];
            var $ = cheerio.load(html);
            $('table .row').each(function () {
                var forecastText = $(this).text();
                var forecast = createForecastFromText(forecastText)
                forecasts.push(forecast);
            });
            callback(forecasts);
        }
    })
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

function createForecastFromText(forecastText) {
    var areaName = getAreaNameFromText(forecastText);
    var areaKey = areaMapper.mapForecastNameToKey(areaName);
    var forecast = getForecastFromText(areaName, forecastText);
    return {
        areaKey: areaKey,
        areaName: areaName,
        forecast: forecast
    };
}

function getAreaNameFromText(forecastText) {
    for (var i = 0; i < AREAS.length; i++) {
        var area = AREAS[i];
        if (forecastText.indexOf(area) > -1) {
            return area;
        }
    }
}

function getForecastFromText(areaName, forecastText) {
    return forecastText.replace(areaName, '');
}

module.exports.findAll = findAllForecasts;
module.exports.get = getForecast;