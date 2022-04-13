"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factor_1 = __importDefault(require("./factor"));
const address_1 = require("../address");
const BN = require("bn.js");
class SettlesSerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const settles = this.data;
        if (settles.length > 0) {
            const lenBuf = new BN(settles.length).toArrayLike(Buffer, "le", 4);
            const dataBuf = [lenBuf];
            for (let d of settles) {
                const fromBuf = (0, address_1.fromAddressBytes)(d.from); // Buffer.from(d.from, "hex");
                const numBuf = new BN(d.num).toArrayLike(Buffer, "le", 8);
                const indexBuf = new BN(d.index).toArrayLike(Buffer, "le", 4);
                const factorBuf = new factor_1.default(d.factor).serial();
                dataBuf.push(fromBuf, numBuf, indexBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    }
}
exports.default = SettlesSerial;
//# sourceMappingURL=settlesSerial.js.map