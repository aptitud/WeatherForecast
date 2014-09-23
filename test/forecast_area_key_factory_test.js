var assert = require("assert")
var forecastAreaKeyFactory = require(__dirname + '/../area_key_factory.js');

describe('Forecast area key factory', function () {
    describe('#createKeyFromName()', function () {
        it('should create key from area name', function () {
            assert.equal(forecastAreaKeyFactory.createKeyFromName("Finska viken"), "FinskaViken");
        })
        it('should create key from area name with HTML encoded name with Swedish characters Ö and ö', function () {
            assert.equal(forecastAreaKeyFactory.createKeyFromName("Syd&ouml;stra &Ouml;stersj&ouml;n"), "SydostraOstersjon");
        })
        it('should create key from area name with HTML encoded name with Swedish characters Ä and ä', function () {
            assert.equal(forecastAreaKeyFactory.createKeyFromName("&Auml;n N&auml;"), "AnNa");
        })
        it('should create key from area name with HTML encoded name with Swedish characters Å and å', function () {
            assert.equal(forecastAreaKeyFactory.createKeyFromName("&Aring;n N&aring;"), "AnNa");
        })
    })
})