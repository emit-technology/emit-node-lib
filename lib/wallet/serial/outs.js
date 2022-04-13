"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const factor_1 = __importDefault(require("./factor"));
const address_1 = require("../address");
const BN = require("bn.js");
class OutsSerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const outs = this.data;
        if (outs.length > 0) {
            const lenBuf = new BN(outs.length).toArrayLike(Buffer, "le", 4);
            const dataBuf = [lenBuf];
            for (let d of outs) {
                const targetBuf = (0, address_1.fromAddressBytes)(d.target);
                const factorBuf = new factor_1.default(d.factor).serial();
                dataBuf.push(targetBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    }
}
exports.default = OutsSerial;
//# sourceMappingURL=outs.js.map