import DataSetsSerial from "./data_sets";
import { BYTES_MAX_LEN } from "./constants";
import FactorSetsSerial from "./factor_set";
var BN = require("bn.js");
var BlockSerial = /** @class */ (function () {
    function BlockSerial(data) {
        var _this = this;
        this.serial = function () {
            var block = _this.data;
            var numBuf = new BN(block.num).toArrayLike(Buffer, "le", 8);
            var timeBuf = new BN(block.timestamp).toArrayLike(Buffer, "le", 8);
            var parentHashBuf = Buffer.from(block.parent_hash, "hex"); //32 bytes
            var dataSetBuf = new DataSetsSerial(block.data_sets).serial();
            var factorSetBuf = new FactorSetsSerial(block.factor_set).serial();
            console.log("block serial >> ", "num", numBuf, "time", timeBuf, "parentHash", parentHashBuf, "dataSetBuf", dataSetBuf, "factorSetBuf", factorSetBuf);
            var bufArr = [
                numBuf,
                timeBuf,
                parentHashBuf,
                dataSetBuf,
                factorSetBuf,
            ];
            if (block.data) {
                if (block.data.length > BYTES_MAX_LEN) {
                    throw new Error("Bytes content is too big");
                }
                bufArr.push(new BN(Buffer.from(block.data, "hex").length).toArrayLike(Buffer, "le", 4));
                bufArr.push(Buffer.from(block.data, "hex"));
            }
            else {
                bufArr.push(Buffer.alloc(4, 0).fill(""));
            }
            var r = Buffer.concat(bufArr);
            console.log(r, "block buffer::");
            return r;
        };
        this.data = data;
    }
    return BlockSerial;
}());
export default BlockSerial;
//# sourceMappingURL=block.js.map