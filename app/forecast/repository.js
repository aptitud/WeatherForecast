var areaKeyFactory = require(__dirname + '/area_key_factory.js');

var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var Entities = require('html-entities').AllHtmlEntities;

var entities = new Entities();

const FORECAST_PROVIDER_URL = "http://www.smhi.se/weatherSMHI2/sjovader/sjovader_data_sv.js";
const FORECAST_LAST_UPDATED_URL = "http://www.smhi.se/vadret/hav-och-kust/sjovader/sjovader_tabell_sv.htm";
const FORECAST_TIME_FORMAT_PATTERN = "HH:mm";

var findAllAreas = function (callback) {
    findAllForecasts(function (error, forecasts) {
        if (!error) {
            var areas = [];
            for (var i = 0; i < forecasts.length; i++) {
                var forecast = forecasts[i];
                var area = {
                    areaKey: areaKeyFactory.createKeyFromName(htmlDecodeText(forecast.areaName)),
                    areaName: htmlDecodeText(forecast.areaName),
                    link: 'http://tiny.cc/' + forecast.areaKey,
                    jsonLink: 'http://sjovaderprognos.herokuapp.com/Sjovaderprognos/' + forecast.areaKey + '?json'
                }
                areas.push(area);
            }
            callback(null, areas);
        } else {
            callback(error);
        }
    });
}

var findAllForecasts = function (callback) {
    request(FORECAST_PROVIDER_URL, function (error, response, scrapedForecasts) {
        if (!error) {
            getLastUpdatedTime(function (error, lastUpdatedTime) {
                if (!error) {
                    callback(null, parseForecastsFromJS(scrapedForecasts, lastUpdatedTime));
                } else {
                    callback(error);
                }
            });
        } else {
            callback(error);
        }
    })
}

var getForecast = function (areaName, callback) {
    findAllForecasts(function (error, forecasts) {
        if (!error) {
            for (var i = 0; i < forecasts.length; i++) {
                var forecast = forecasts[i];
                if (forecast.areaName === areaName) {
                    callback(null, forecast);
                    return;
                }
            }
            callback("No area name found for: " + areaName);
        } else {
            callback(error);
        }
    });
}

var getLastUpdatedTime = function (callback) {
    request(FORECAST_LAST_UPDATED_URL, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var containerHtml = $('#container').text();
            var dateStart = containerHtml.lastIndexOf('Utfärdad ');
            var timeStart = containerHtml.lastIndexOf(' kl');
            var year = containerHtml.substring(dateStart + 9, dateStart + 13);
            var month = containerHtml.substring(dateStart + 14, dateStart + 16);
            var day = containerHtml.substring(dateStart + 17, dateStart + 19);
            var hour = containerHtml.substring(timeStart + 4, timeStart + 6);
            var minute = containerHtml.substring(timeStart + 7, timeStart + 9);
            var lastUpdatedTime = moment({ y: year, M: --month, d: day, h: hour, m: minute, z: +"02:00"});
            callback(null, lastUpdatedTime);
        } else {
            callback(error);
        }
    })

}

function parseForecastsFromJS(scrapedForecasts, lastUpdatedTime) {
    var forecasts = [];

    var scrapedForecastsArray = scrapedForecasts.split("\n").map(function (val) {
        return val.substring(val.lastIndexOf('="') + 2, val.lastIndexOf('";'));
    });

    for (var i = 0; i < scrapedForecastsArray.length; i += 2) {
        var areaName = scrapedForecastsArray[i];
        if (areaName != '') {
            var areaKey = areaKeyFactory.createKeyFromName(areaName);
            var forecastText = scrapedForecastsArray[i + 1];
            var forecast = {
                areaKey: areaKey,
                areaName: htmlDecodeText(areaName),
                forecast: htmlDecodeText(forecastText),
                link: 'http://tiny.cc/' + areaKey,
                jsonLink: 'http://sjovaderprognos.herokuapp.com/Sjovaderprognos/' + areaKey + '?json',
                time: lastUpdatedTime.format(FORECAST_TIME_FORMAT_PATTERN)
            };
            forecasts.push(forecast);
        }
    }

    return forecasts;
}

function htmlDecodeText(text) {
    return entities.decode(text);
}

module.exports.findAllAreas = findAllAreas;
module.exports.findAll = findAllForecasts;
module.exports.get = getForecast;
module.exports.getLastUpdatedTime = getLastUpdatedTime;