var tweeter = require(__dirname + '/app/forecast/tweeter.js');
var webApi = require(__dirname + '/app/forecast/web_api.js');

console.log("Will use following env variables for tweeting: \nconsumer_key:" + process.env.twitter_consumer_key + " \nconsumer_secret:" + process.env.twitter_consumer_secret + " \naccess_token:" + process.env.twitter_access_token + " \naccess_token_secret:" + process.env.twitter_access_token_secret)

tweeter.startTweeting();
webApi.startWebApi();