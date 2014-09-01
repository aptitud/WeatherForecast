var request = require('request');
var cheerio = require('cheerio');

var parseForecasts = function (callback) {
    request('http://www.smhi.se/vadret/hav-och-kust/sjovader/sjovader_tabell_sv.htm', function (error, response, html) {
        if (!error) {
            var forecasts = [];
            var $ = cheerio.load(html);
            $('table .row').each(function () {
                var forecast = $(this).text();
                forecasts.push(forecast);
                //if (forecast.indexOf(NORRA_OSTERSJON) > -1) {
                //    var forecastText = forecast.replace(NORRA_OSTERSJON, '');
                //    responseText = createResponse(NORRA_OSTERSJON, forecastText, res);
                //    sendTweet(NORRA_OSTERSJON, forecastText);
                //}
            });
            callback(forecasts);
        }
    })

}

module.exports.parse = parseForecasts;