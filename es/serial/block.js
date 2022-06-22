import DataSetsSerial from "./data_sets";
import { BYTES_MAX_LEN } from "./constants";
import FactorSetsSerial from "./factor_set";
const BN = require("bn.js");
class BlockSerial {
    constructor(data) {
        this.serial = () => {
            const block = this.data;
            const numBuf = new BN(block.num).toArrayLike(Buffer, "le", 8);
            const timeBuf = new BN(block.timestamp).toArrayLike(Buffer, "le", 8);
            const parentHashBuf = Buffer.from(block.parent_hash, "hex"); //32 bytes
            const dataSetBuf = new DataSetsSerial(block.data_sets).serial();
            const factorSetBuf = new FactorSetsSerial(block.factor_set).serial();
            const bufArr = [
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
            const r = Buffer.concat(bufArr);
            return r;
        };
        this.data = data;
    }
}
export default BlockSerial;
//# sourceMappingURL=block.js.map