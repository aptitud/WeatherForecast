var assert = require("assert")
var forecastAreaMapper = require(__dirname + '/../area_mapper.js');

describe('Forecast area mapper', function () {
    describe('#mapForecastKeyToName()', function () {
        it('should map forecast key to name', function () {
            assert.equal(forecastAreaMapper.mapForecastKeyToName("FinskaViken"), "Finska viken");
        })
        it('should map forecast key to name with HTML encoded name', function () {
            assert.equal(forecastAreaMapper.mapForecastKeyToName("NorraOstersjon"), "Norra &Ouml;stersj&ouml;n");
        })
    })
})