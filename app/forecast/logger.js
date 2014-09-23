var npmLog = require('npmlog')
var moment = require('moment');

const TIME_FORMAT_PATTERN = "YYYY-MM-DD, HH:mm:ss:SSS Z";

var logInfo = function (logMessage) {
    npmLog.info('Forecast', formatTime(moment()) + " " + logMessage);
}

var logWarn = function (logMessage) {
    npmLog.warn('Forecast', formatTime(moment()) + " " + logMessage);
}

var logError = function (logMessage) {
    npmLog.error('Forecast', formatTime(moment()) + " " + logMessage);
}

function formatTime(moment) {
    return moment.format(TIME_FORMAT_PATTERN);
}

module.exports.info = logInfo;
module.exports.warn = logWarn;
module.exports.error = logError;