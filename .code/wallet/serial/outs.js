import FactorSerial from "./factor";
import { fromAddressBytes } from "../address";
var BN = require("bn.js");
var OutsSerial = /** @class */ (function () {
    function OutsSerial(data) {
        this.data = data;
    }
    OutsSerial.prototype.serial = function () {
        var outs = this.data;
        if (outs.length > 0) {
            var lenBuf = new BN(outs.length).toArrayLike(Buffer, "le", 4);
            var dataBuf = [lenBuf];
            for (var _i = 0, outs_1 = outs; _i < outs_1.length; _i++) {
                var d = outs_1[_i];
                var targetBuf = fromAddressBytes(d.target);
                var factorBuf = new FactorSerial(d.factor).serial();
                dataBuf.push(targetBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    };
    return OutsSerial;
}());
export default OutsSerial;
//# sourceMappingURL=outs.js.map