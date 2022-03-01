"use strict";
exports.__esModule = true;
var settlesSerial_1 = require("./settlesSerial");
var outs_1 = require("./outs");
var FactorSetsSerial = /** @class */ (function () {
    function FactorSetsSerial(data) {
        var _this = this;
        this.serial = function () {
            var settles = _this.data.settles;
            var outs = _this.data.outs;
            var settlesBuf = new settlesSerial_1["default"](settles).serial();
            var outsBuf = new outs_1["default"](outs).serial();
            return Buffer.concat([settlesBuf, outsBuf]);
        };
        this.data = data;
    }
    return FactorSetsSerial;
}());
exports["default"] = FactorSetsSerial;
