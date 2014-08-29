var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

const FLADEN_OCH_DOGGER = "Fladen och Dogger";
const NORRA_OSTERSJON = "Norra Östersjön";

app.get('/SWF', function (req, res) {
    request('http://www.smhi.se/vadret/hav-och-kust/sjovader/sjovader_tabell_sv.htm', function (error, response, html) {
        if (!error) {
            var responseText;
            var $ = cheerio.load(html);
            $('table .row').each(function () {
                var forecast = $(this).text();
                if (forecast.indexOf(NORRA_OSTERSJON) > -1) {
                    var forecastText = forecast.replace(NORRA_OSTERSJON, '');
                    responseText = createResponse(NORRA_OSTERSJON, forecastText, res);
                    sendTweet(NORRA_OSTERSJON, forecastText);
                }
            });
            res.send(responseText);
        }
    })
});

function createResponse(forecastHeader, forecastText) {
    return '<p><b>' + forecastHeader + '</b><br/>' + forecastText + '</p>';
}

function sendTweet(forecastHeader, forecastText) {
    // TODO: Send tweet to correct Twitter account
}

app.listen(8080)

exports = module.exports = app;