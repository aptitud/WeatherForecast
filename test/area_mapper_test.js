var assert = require("assert")
var forecastAreaMapper = require(__dirname + '/../app/forecast/area_mapper.js');

describe('Area mapper', function () {
    describe('#mapForecastKeyToName()', function () {
        it('should map forecast key to name', function () {
                assert.equal(forecastAreaMapper.mapForecastKeyToName("FinskaViken"), "Finska viken");
        })
        it('should map forecast key to name with swedish characters', function () {
            assert.equal(forecastAreaMapper.mapForecastKeyToName("NorraOstersjon"), "Norra Östersjön");
        })
    })
})