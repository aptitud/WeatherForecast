var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/SWF', function (req, res) {
    request('http://www.smhi.se/vadret/hav-och-kust/sjovader/sjovader_tabell_sv.htm', function (error, response, html) {
        if (!error) {
            var forecasts = [];
            var $ = cheerio.load(html);
            $('table .row').each(function () {
                var forecast = $(this).text();
                forecasts.push(forecast);
            });
            res.send(forecasts);
        }
    })
});

app.listen(8080)

console.log('Web scraping server started on port 8080');

exports = module.exports = app;