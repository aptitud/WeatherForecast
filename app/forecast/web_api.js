var express = require('express');
var fs = require('fs');
var app = express();

var forecastRepository = require(__dirname + '/repository.js');
var forecastAreaMapper = require(__dirname + '/area_mapper.js');

function startWebApi() {
    app.get("/", function (req, res) {
        res.redirect('/Sjovaderprognos');
    })

    app.get("/Sjovaderprognos", function (req, res) {
        forecastRepository.findAll(function (error, forecasts) {
            createAndSendResponse(res, forecasts);
        });
    })

    app.get("/Sjovaderprognos/:area", function (req, res) {
        var areaKey = req.params.area;
        var areaName = forecastAreaMapper.mapForecastKeyToName(areaKey);
        if (typeof areaName === 'undefined') {
            res.send("Oops! Området " + areaKey + " fanns inte prognos för...");
        } else {
            forecastRepository.get(areaName, function (forecast) {
                createAndSendResponse(res, [forecast]);
            });
        }
    })

    var port = Number(process.env.app_port || process.env.PORT || 1337);
    app.listen(port)
}

function createAndSendResponse(res, forecasts) {
    createResponse(forecasts, function (response) {
        res.send(response);
    });
}

function createResponse(forecasts, callback) {
    var css = fs.readFileSync("app/forecast/style.css", "utf8");
    var response = "<html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'><title>Sjöväderprognos från SMHI</title><link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css'><link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Amatic+SC'><style>" + css + "</style></head><body>";
    for (var i = 0; i < forecasts.length; i++) {
        response = response.concat("<p class='forecast'><a href='/Sjovaderprognos/" + forecasts[i].areaKey + "'><span class='area-name'>" + forecasts[i].areaName + "</span> kl: <span class='forecast-time'>" + forecasts[i].time + "</span><br/><span class='forecast-text'>\"" + forecasts[i].forecast + "\"</span></a></p>")
    }
    if (forecasts.length <= 1) {
        response = response.concat("<p class='links'><a href='/Sjovaderprognos'>Alla</a>");
        forecastRepository.findAll(function (error, forecasts) {
            for (var i = 0; i < forecasts.length; i++) {
                response = response.concat("<a href='" + forecasts[i].areaKey + "'>" + forecasts[i].areaName + "</a>");
            }
            callback(response.concat("</p></body></html>"));
        });
    } else {
        callback(response.concat("</p></body></html>"));
    }
}

module.exports.startWebApi = startWebApi;