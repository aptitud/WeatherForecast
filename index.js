var http = require("http");
var request = require('request');

http.createServer(function (req, resp) {

    var options = {
        url: 'http://opendata-download-metfcst.smhi.se/api/category/pmp1.5g/version/1/geopoint/lat/58.59/lon/16.18/data.json',
        method: 'GET'
    }

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)

            resp.writeHead(200, {"Content-Type": "text/plain"});
            resp.write(body);
            resp.end();
        }
    })

}).listen(8888);