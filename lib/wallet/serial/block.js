"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_sets_1 = require("./data_sets");
const constants_1 = require("./constants");
const factor_set_1 = require("./factor_set");
const BN = require("bn.js");
class BlockSerial {
    constructor(data) {
        this.serial = () => {
            const block = this.data;
            const numBuf = new BN(block.num).toArrayLike(Buffer, "le", 8);
            const timeBuf = new BN(block.timestamp).toArrayLike(Buffer, "le", 8);
            const parentHashBuf = Buffer.from(block.parent_hash, "hex"); //32 bytes
            const dataSetBuf = new data_sets_1.default(block.data_sets).serial();
            const factorSetBuf = new factor_set_1.default(block.factor_set).serial();
            console.log("block serial >> ", "num", numBuf, "time", timeBuf, "parentHash", parentHashBuf, "dataSetBuf", dataSetBuf, "factorSetBuf", factorSetBuf);
            const bufArr = [
                numBuf,
                timeBuf,
                parentHashBuf,
                dataSetBuf,
                factorSetBuf,
            ];
            if (block.data) {
                if (block.data.length > constants_1.BYTES_MAX_LEN) {
                    throw new Error("Bytes content is too big");
                }
                bufArr.push(new BN(Buffer.from(block.data, "hex").length).toArrayLike(Buffer, "le", 4));
                bufArr.push(Buffer.from(block.data, "hex"));
            }
            else {
                bufArr.push(Buffer.alloc(4, 0).fill(""));
            }
            const r = Buffer.concat(bufArr);
            console.log(r, "block buffer::");
            return r;
        };
        this.data = data;
    }
}
exports.default = BlockSerial;
//# sourceMappingURL=block.js.map