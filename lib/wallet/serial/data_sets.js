"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const BN = require("bn.js");
class DataSetsSerial {
    constructor(data) {
        this.serial = () => {
            if (this.data && this.data.length > constants_1.VEC_T_MAX_LEN) {
                throw new Error("INVALID_FORMAT");
            }
            const len = this.data.length;
            const lenBuf = new BN(len).toArrayLike(Buffer, "le", 4);
            const bufArr = [lenBuf];
            for (let d of this.data) {
                bufArr.push(Buffer.concat([
                    Buffer.from(d.name, "hex"),
                    new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4),
                    Buffer.from(d.data, "hex"),
                ]));
            }
            return Buffer.concat(bufArr);
        };
        this.data = data;
    }
}
exports.default = DataSetsSerial;
//# sourceMappingURL=data_sets.js.map