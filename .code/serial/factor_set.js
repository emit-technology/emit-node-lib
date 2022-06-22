"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var settlesSerial_1 = tslib_1.__importDefault(require("./settlesSerial"));
var outs_1 = tslib_1.__importDefault(require("./outs"));
var FactorSetsSerial = /** @class */ (function () {
    function FactorSetsSerial(data) {
        var _this = this;
        this.serial = function () {
            var settles = _this.data.settles;
            var outs = _this.data.outs;
            var settlesBuf = new settlesSerial_1.default(settles).serial();
            var outsBuf = new outs_1.default(outs).serial();
            return Buffer.concat([settlesBuf, outsBuf]);
        };
        this.data = data;
    }
    return FactorSetsSerial;
}());
exports.default = FactorSetsSerial;
//# sourceMappingURL=factor_set.js.map