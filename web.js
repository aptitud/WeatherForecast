var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/NorraOstersjon', function(req, res) {
    // Web scrape and tweet
    res.send('Web scrape and tweet');
});

app.listen(8080)

console.log('Web scraping server started on port 8080');

exports = module.exports = app;