var Twit = require('twit')

var featureToogle = false;

var tweetForecast = function (areaKey, forecast) {
    if (forecast.areaKey === 'NorraOstersjon') {
        console.log("### Tweeting: " + areaKey + ": " + forecast);

        if (featureToogle) {
            var tweet = polishForecast(forecast);

            var T = new Twit({
                consumer_key: '...',
                consumer_secret: '...',
                access_token: '...',
                access_token_secret: '...'
            });

            T.post('statuses/update', { status: tweet }, function (err, data, response) {
                console.log(data)
            })
        }
    }
}

function polishForecast(forecast) {
    // TODO: Urldecode and check length is less or equal to 140(???)
    return forecast;
}

module.exports.tweet = tweetForecast;