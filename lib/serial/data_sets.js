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
                const nameBuf = Buffer.from(d.name, "hex");
                const dataLenBuf = new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4);
                const dataBuf = Buffer.from(d.data, "hex");
                bufArr.push(nameBuf);
                bufArr.push(dataLenBuf);
                bufArr.push(dataBuf);
                if (d.old) {
                    const oldStation = new BN(1).toArrayLike(Buffer, "le", 1);
                    const oldLenBuf = new BN(Buffer.from(d.old, "hex").length).toArrayLike(Buffer, "le", 4);
                    const oldBuf = Buffer.from(d.old, "hex");
                    bufArr.push(oldStation);
                    bufArr.push(oldLenBuf);
                    bufArr.push(oldBuf);
                }
                else {
                    const oldStation = new BN(0).toArrayLike(Buffer, "le", 1);
                    bufArr.push(oldStation);
                }
            }
            return Buffer.concat(bufArr);
        };
        this.data = data;
    }
}
exports.default = DataSetsSerial;
//# sourceMappingURL=data_sets.js.map