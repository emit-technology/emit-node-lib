"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = require("../address");
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
        const addrBuf = (0, address_1.fromAddressBytes)(category.field); //Buffer.from(category.field, "hex");
        const nameBuf = Buffer.from(category.name, "hex");
        return Buffer.concat([addrBuf, nameBuf]);
    }
}
exports.default = FactorSerial;
//# sourceMappingURL=factor.js.map