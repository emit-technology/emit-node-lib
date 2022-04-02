import FactorSerial from "./factor";
import { fromAddressBytes } from "../address";
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
                const fromBuf = fromAddressBytes(d.from); // Buffer.from(d.from, "hex");
                const numBuf = new BN(d.num).toArrayLike(Buffer, "le", 8);
                const indexBuf = new BN(d.index).toArrayLike(Buffer, "le", 4);
                const factorBuf = new FactorSerial(d.factor).serial();
                dataBuf.push(fromBuf, numBuf, indexBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    }
}
export default SettlesSerial;
//# sourceMappingURL=settlesSerial.js.map