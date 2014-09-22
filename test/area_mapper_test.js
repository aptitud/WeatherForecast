var assert = require("assert")
var areaMapper = require(__dirname + '/../area_mapper.js');

describe('Area mapper', function () {
    describe('#mapForecastKeyToName()', function () {
        it('should map forecast key to name', function () {
            assert.equal(areaMapper.mapForecastKeyToName("FinskaViken"), "Finska viken");
        })
        it('should map forecast key to name with HTML encoded name', function () {
            assert.equal(areaMapper.mapForecastKeyToName("NorraOstersjon"), "Norra &Ouml;stersj&ouml;n");
        })
    })
})