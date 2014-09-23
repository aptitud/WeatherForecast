var tweeter = require(__dirname + '/app/forecast/tweeter.js');
var webApi = require(__dirname + '/app/forecast/web_api.js');

tweeter.startTweeting();
webApi.startWebApi();