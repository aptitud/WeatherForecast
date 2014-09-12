var mapForecastKeyToName = function (areaKey) {
    if (areaKey === "Fladen") {
        return "Fladen";

    } else if (areaKey === "Dogger") {
        return "Dogger";

    } else if (areaKey === "TyskaBukten") {
        return "Tyska bukten";

    } else if (areaKey === "Fiskebankarna") {
        return "Fiskebankarna";

    } else if (areaKey === "SydUtsira") {
        return "Syd Utsira";

    } else if (areaKey === "Skagerack") {
        return "Skagerack";

    } else if (areaKey === "Kattegatt") {
        return "Kattegatt";

    } else if (areaKey === "Balten") {
        return "B&auml;lten";

    } else if (areaKey === "Vanern") {
        return "V&auml;nern";

    } else if (areaKey === "Oresund") {
        return "&Ouml;resund";

    } else if (areaKey === "SodraOstersjon") {
        return "S&ouml;dra &Ouml;stersj&ouml;n";

    } else if (areaKey === "SydvastraOstersjon") {
        return "Sydv&auml;stra &Ouml;stersj&ouml;n";

    } else if (areaKey === "SydostraOstersjon") {
        return "Syd&ouml;stra &Ouml;stersj&ouml;n";

    } else if (areaKey === "MellerstaOstersjon") {
        return "Mellersta &Ouml;stersj&ouml;n";

    } else if (areaKey === "NorraOstersjon") {
        return "Norra &Ouml;stersj&ouml;n";

    } else if (areaKey === "Rigabukten") {
        return "Rigabukten";

    } else if (areaKey === "FinskaViken") {
        return "Finska viken";

    } else if (areaKey === "AlandsHav") {
        return "&Aring;lands hav";

    } else if (areaKey === "Skargardshavet") {
        return "Sk&auml;rg&aring;rdshavet";

    } else if (areaKey === "SodraBottenhavet") {
        return "S&ouml;dra Bottenhavet";

    } else if (areaKey === "NorraBottenhavet") {
        return "Norra Bottenhavet";

    } else if (areaKey === "NorraKvarken") {
        return  "Norra Kvarken";

    } else if (areaKey === "Bottenviken") {
        return  "Bottenviken";

    }
};

var mapForecastNameToKey = function (areaName) {
    if (areaName === "Fladen") {
        return "Fladen";

    } else if (areaName === "Dogger") {
        return "Dogger";

    } else if (areaName === "Tyska bukten") {
        return "TyskaBukten";

    } else if (areaName === "Fiskebankarna") {
        return "Fiskebankarna";

    } else if (areaName === "Syd Utsira") {
        return "SydUtsira";

    } else if (areaName === "Skagerack") {
        return "Skagerack";

    } else if (areaName === "Kattegatt") {
        return "Kattegatt";

    } else if (areaName === "B&auml;lten") {
        return "Balten";

    } else if (areaName === "V&auml;nern") {
        return "Vanern";

    } else if (areaName === "&Ouml;resund") {
        return "Oresund";

    } else if (areaName === "S&ouml;dra &Ouml;stersj&ouml;n") {
        return "SodraOstersjon";

    } else if (areaName === "Sydv&auml;stra &Ouml;stersj&ouml;n") {
        return "SydvastraOstersjon";

    } else if (areaName === "Syd&ouml;stra &Ouml;stersj&ouml;n") {
        return "SydostraOstersjon";

    } else if (areaName === "Mellersta &Ouml;stersj&ouml;n") {
        return "MellerstaOstersjon";

    } else if (areaName === "Norra &Ouml;stersj&ouml;n") {
        return "NorraOstersjon";

    } else if (areaName === "Rigabukten") {
        return "Rigabukten";

    } else if (areaName === "Finska viken") {
        return "FinskaViken";

    } else if (areaName === "&Aring;lands hav") {
        return "AlandsHav";

    } else if (areaName === "Sk&auml;rg&aring;rdshavet") {
        return "Skargardshavet";

    } else if (areaName === "S&ouml;dra Bottenhavet") {
        return "SodraBottenhavet";

    } else if (areaName === "Norra Bottenhavet") {
        return "NorraBottenhavet";

    } else if (areaName === "Norra Kvarken") {
        return  "NorraKvarken";

    } else if (areaName === "Bottenviken") {
        return  "Bottenviken";

    }
};

module.exports.mapForecastKeyToName = mapForecastKeyToName;
module.exports.mapForecastNameToKey = mapForecastNameToKey;