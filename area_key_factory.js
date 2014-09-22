var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();

String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}

var createKeyFromName = function (areaName) {
    return camelize(replaceSwedishCharacters(htmlDecode(areaName)));
};

function htmlDecode(text) {
    return entities.decode(text);
}

function replaceSwedishCharacters(text) {
    return text.replaceAll("Ö", "O").replaceAll("ö", "o").replaceAll("Ä", "A").replaceAll("ä", "a").replaceAll("Å", "A").replaceAll("å", "a");
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return match.toUpperCase();
    });
}

module.exports.createKeyFromName = createKeyFromName;