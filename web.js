var http = require("http");
var request = require('request');
var express = require('express');
var app = express();
//var server = http.createServer(app)

//app.configure(function () {
//    app.use(express.json());
//    app.use(express.urlencoded());
//});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
    next();
});

app.get('/', function (req, res) {
    res.send('Yes, Weather Forecast (Anders edition) is up and running');
});

app.get('/forecast/lat/:lat/lon/:lon', function (req, res) {
    getWeatherForecast(req.params.lat, req.params.lon, function (timeseries, errorMessage) {
        if (errorMessage) {
            res.send('Sorry, SMHI says: "' + errorMessage + '"');
        } else {
            var timeSeriesArray = toArray(timeseries);
            res.send(timeSeriesArray);
        }
    });
});

app.listen(8080);

function getWeatherForecast(lat, lon, callback) {
    var options = {
        url: 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/' + lat + '/lon/' + lon + '/data.json',
        method: 'GET'
    }

    request(options, function (error, response, body) {
        if (response.statusCode == 200) {
            var forecasts = JSON.parse(body);
            var timeseries = forecasts.timeseries;
            return callback(timeseries, null);
        } else {
            return callback(null, body);
        }
    })
}

function toArray(timeseries) {
    var timeSeriesArray = [];
    timeseries.forEach(function (forecast) {
        timeSeriesArray.push(forecast);
    });
    return timeSeriesArray;
}