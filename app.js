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
    var response = "<html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'><title>Sjöväderprognos från SMHI</title><link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Shadows+Into+Light'><style>body { background: -webkit-linear-gradient(white, #2BBBD8); /* For Safari 5.1 to 6.0 */ background: -o-linear-gradient(white, #2BBBD8); /* For Opera 11.1 to 12.0 */ background: -moz-linear-gradient(white, #2BBBD8); /* For Firefox 3.6 to 15 */ background: linear-gradient(white, #2BBBD8); /* Standard syntax (must be last) */; color: #102E37; font-family: 'Shadows Into Light', serif; font-size: 10px } .forecast { margin-bottom: 20px; padding: 10px; } .forecast a { color: #102E37; text-decoration: none; } .area-name { font-size: 4.5em; font-weight: bold } .forecast-text { font-size: 3.5em; } .links { margin-top: 50px; padding: 10px; border-top: 1px solid lightblue; font-size: 2em} .links a { margin-left: 5px; margin-right: 5px; display: inline-block; } .links a:link { text-decoration: none; color: lightseagreen } .links a:visited { text-decoration: none; color: lightseagreen } .links a:hover { text-decoration: none; color: darkblue } .links a:active { text-decoration: none; color: lightseagreen }</style></head><body>";
    for (var i = 0; i < forecasts.length; i++) {
        response = response.concat("<p class='forecast'><a href='Sjovaderprognos/" + forecasts[i].areaKey + "'><span class='area-name'>" + forecasts[i].areaName + "</span><br/><span class='forecast-text'>\"" + forecasts[i].forecast + "\"</span></a></p>")
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

function sendTweet(forecastHeader, forecastText) {
    // TODO: Send tweet to correct Twitter account
}

var port = Number(process.env.PORT || 8080);
app.listen(port)

exports = module.exports = app;