var request = require('request');
var cheerio = require('cheerio');

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

var getForecast = function (area, callback) {
    findAllForecasts(function (forecasts) {
        for (var i = 0; i < forecasts.length; i++) {
            var forecast = forecasts[i];
            if (forecast.area === area) {
                callback(forecast);
            }
        }
    });
}

function createForecastFromText(forecastText) {
    var area = getAreaFromText(forecastText);
    var forecast = getForecastFromText(area, forecastText);
    return {
        area: area,
        forecast: forecast
    };
}

function getAreaFromText(forecastText) {
    for (var i = 0; i < AREAS.length; i++) {
        var area = AREAS[i];
        if (forecastText.indexOf(area) > -1) {
            return area;
        }
    }
}

function getForecastFromText(area, forecastText) {
    return forecastText.replace(area, '');
}

module.exports.findAll = findAllForecasts;
module.exports.get = getForecast;