var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();

var createKeyFromName = function (areaName) {
    return camelize(replaceSwedishCharacters(htmlDecode(areaName)));
};

function htmlDecode(text) {
    return entities.decode(text);
}

function replaceSwedishCharacters(text) {
    return text.replace("Ö", "O").replace("ö", "o").replace("Ä", "A").replace("ä", "a").replace("Å", "A").replace("å", "a");
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return match.toUpperCase();
    });
}

module.exports.createKeyFromName = createKeyFromName;