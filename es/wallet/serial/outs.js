import FactorSerial from "./factor";
import { fromAddressBytes } from "../address";
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
                const targetBuf = fromAddressBytes(d.target);
                const factorBuf = new FactorSerial(d.factor).serial();
                dataBuf.push(targetBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    }
}
export default OutsSerial;
//# sourceMappingURL=outs.js.map