var express = require('express');
var fs = require('fs');
var forecastParser = require(__dirname + '/forecast_parser.js');
var app = express();

const FLADEN_OCH_DOGGER = "Fladen och Dogger";
const NORRA_OSTERSJON = "Norra Östersjön";

app.get('/SWF', function (req, res) {
    forecastParser.parse(function(forecasts) {
        res.send(forecasts);
    });
});

function createResponse(forecastHeader, forecastText) {
    return '<p><b>' + forecastHeader + '</b><br/>' + forecastText + '</p>';
}

function sendTweet(forecastHeader, forecastText) {
    // TODO: Send tweet to correct Twitter account
}

app.listen(8080)

exports = module.exports = app;