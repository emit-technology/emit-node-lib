"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../address");
const BN = require("bn.js");
class FactorSerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const factor = this.data;
        const categoryBuf = new CategorySerial(factor.category).serial();
        const valueBuf = Buffer.from(factor.value, "hex");
        return Buffer.concat([categoryBuf, valueBuf]);
    }
}
class CategorySerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const category = this.data;
        const supplierBuf = (0, address_1.fromAddressBytes)(category.supplier); //Buffer.from(category.field, "hex");
        const symbolBuf = Buffer.from(category.symbol, "hex");
        const symbolLenBuf = new BN(symbolBuf.length).toArrayLike(Buffer, "le", 4);
        const idBuf = Buffer.from(category.id, "hex");
        const idLenBuf = new BN(idBuf.length).toArrayLike(Buffer, "le", 4);
        return Buffer.concat([supplierBuf, symbolLenBuf, symbolBuf, idLenBuf, idBuf]);
    }
}
exports.default = FactorSerial;
//# sourceMappingURL=factor.js.map