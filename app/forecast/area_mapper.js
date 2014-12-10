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
        return "Bälten";

    } else if (areaKey === "Vanern") {
        return "Vänern";

    } else if (areaKey === "Oresund") {
        return "Öresund";

    } else if (areaKey === "SodraOstersjon") {
        return "Södra Östersjön";

    } else if (areaKey === "SydvastraOstersjon") {
        return "Sydvästra Östersjön";

    } else if (areaKey === "SydostraOstersjon") {
        return "Sydöstra Östersjön";

    } else if (areaKey === "MellerstaOstersjon") {
        return "Mellersta Östersjön";

    } else if (areaKey === "NorraOstersjon") {
        return "Norra Östersjön";

    } else if (areaKey === "Rigabukten") {
        return "Rigabukten";

    } else if (areaKey === "FinskaViken") {
        return "Finska viken";

    } else if (areaKey === "AlandsHav") {
        return "&Aring;lands hav";

    } else if (areaKey === "Skargardshavet") {
        return "Skärgårdshavet";

    } else if (areaKey === "SodraBottenhavet") {
        return "Södra Bottenhavet";

    } else if (areaKey === "NorraBottenhavet") {
        return "Norra Bottenhavet";

    } else if (areaKey === "NorraKvarken") {
        return  "Norra Kvarken";

    } else if (areaKey === "Bottenviken") {
        return  "Bottenviken";

    }
};

module.exports.mapForecastKeyToName = mapForecastKeyToName;