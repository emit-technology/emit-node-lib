"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var factor_1 = tslib_1.__importDefault(require("./factor"));
var address_1 = require("../address");
var BN = require("bn.js");
var OutsSerial = /** @class */ (function () {
    function OutsSerial(data) {
        this.data = data;
    }
    OutsSerial.prototype.serial = function () {
        var outs = this.data;
        if (outs.length > 0) {
            var lenBuf = new BN(outs.length).toArrayLike(Buffer, "le", 4);
            var dataBuf = [lenBuf];
            for (var _i = 0, outs_1 = outs; _i < outs_1.length; _i++) {
                var d = outs_1[_i];
                var targetBuf = address_1.fromAddressBytes(d.target);
                var factorBuf = new factor_1.default(d.factor).serial();
                dataBuf.push(targetBuf, factorBuf);
                var lenBuf_1 = new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4);
                var oDataBuf = Buffer.from(d.data, "hex");
                dataBuf.push(lenBuf_1, oDataBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    };
    return OutsSerial;
}());
exports.default = OutsSerial;
//# sourceMappingURL=outs.js.map