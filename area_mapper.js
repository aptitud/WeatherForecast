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

    } else if (areaKey === "KattegattOchBalten") {
        return "Kattegatt och Bälten";

    } else if (areaKey === "Vanern") {
        return "Vänern";

    } else if (areaKey === "Oresund") {
        return "Öresund";

    } else if (areaKey === "SydvastraOchSodraOstersjon") {
        return "Sydvästra och södra Östersjön";

    } else if (areaKey === "SydostraOstersjon") {
        return "Sydöstra Östersjön";

    } else if (areaKey === "MellerstaOstersjön") {
        return "Mellersta Östersjön";

    } else if (areaKey === "NorraOstersjon") {
        return "Norra Östersjön";

    } else if (areaKey === "Rigabukten") {
        return "Rigabukten";

    } else if (areaKey === "FinskaViken") {
        return "Finska viken";

    } else if (areaKey === "AlandsHav") {
        return "Ålands hav";

    } else if (areaKey === "Skargardshavet") {
        return "Skärgårdshavet";

    } else if (areaKey === "Bottenhavet") {
        return "Bottenhavet";

    } else if (areaKey === "NorraKvarkenOchBottenviken") {
        return  "Norra Kvarken och Bottenviken";

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

    } else if (areaName === "Kattegatt och Bälten") {
        return "KattegattOchBalten";

    } else if (areaName === "Vänern") {
        return "Vanern";

    } else if (areaName === "Öresund") {
        return "Oresund";

    } else if (areaName === "Sydvästra och södra Östersjön") {
        return "SydvastraOchSodraOstersjon";

    } else if (areaName === "Sydöstra Östersjön") {
        return "SydostraOstersjon";

    } else if (areaName === "Mellersta Östersjön") {
        return "MellerstaOstersjön";

    } else if (areaName === "Norra Östersjön") {
        return "NorraOstersjon";

    } else if (areaName === "Rigabukten") {
        return "Rigabukten";

    } else if (areaName === "Finska viken") {
        return "FinskaViken";

    } else if (areaName === "Ålands hav") {
        return "AlandsHav";

    } else if (areaName === "Skärgårdshavet") {
        return "Skargardshavet";

    } else if (areaName === "Bottenhavet") {
        return "Bottenhavet";

    } else if (areaName === "Norra Kvarken och Bottenviken") {
        return  "NorraKvarkenOchBottenviken";

    }
};

module.exports.mapForecastKeyToName = mapForecastKeyToName;
module.exports.mapForecastNameToKey = mapForecastNameToKey;