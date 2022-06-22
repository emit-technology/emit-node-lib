"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_1 = require("../address");
var BN = require("bn.js");
var FactorSerial = /** @class */ (function () {
    function FactorSerial(data) {
        this.data = data;
    }
    FactorSerial.prototype.serial = function () {
        var factor = this.data;
        var categoryBuf = new CategorySerial(factor.category).serial();
        var valueBuf = Buffer.from(factor.value, "hex");
        return Buffer.concat([categoryBuf, valueBuf]);
    };
    return FactorSerial;
}());
var CategorySerial = /** @class */ (function () {
    function CategorySerial(data) {
        this.data = data;
    }
    CategorySerial.prototype.serial = function () {
        var category = this.data;
        var supplierBuf = address_1.fromAddressBytes(category.supplier); //Buffer.from(category.field, "hex");
        var symbolBuf = Buffer.from(category.symbol, "hex");
        var symbolLenBuf = new BN(symbolBuf.length).toArrayLike(Buffer, "le", 4);
        var idBuf = Buffer.from(category.id, "hex");
        var idLenBuf = new BN(idBuf.length).toArrayLike(Buffer, "le", 4);
        return Buffer.concat([supplierBuf, symbolLenBuf, symbolBuf, idLenBuf, idBuf]);
    };
    return CategorySerial;
}());
exports.default = FactorSerial;
//# sourceMappingURL=factor.js.map