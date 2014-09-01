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

    } else if (areaKey === "Skärgårdshavet") {
        return "Skärgårdshavet";

    } else if (areaKey === "Bottenhavet") {
        return "Bottenhavet";

    } else if (areaKey === "NorraKvarkenOchBottenviken") {
        return  "Norra Kvarken och Bottenviken";

    }
};

module.exports.map = mapForecastKeyToName;