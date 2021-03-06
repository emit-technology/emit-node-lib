import FactorSerial from "./factor";
import { fromAddressBytes } from "../address";
var BN = require("bn.js");
var SettlesSerial = /** @class */ (function () {
    function SettlesSerial(data) {
        this.data = data;
    }
    SettlesSerial.prototype.serial = function () {
        var settles = this.data;
        if (settles.length > 0) {
            var lenBuf = new BN(settles.length).toArrayLike(Buffer, "le", 4);
            var dataBuf = [lenBuf];
            for (var _i = 0, settles_1 = settles; _i < settles_1.length; _i++) {
                var d = settles_1[_i];
                var fromBuf = fromAddressBytes(d.from); // Buffer.from(d.from, "hex");
                var numBuf = new BN(d.num).toArrayLike(Buffer, "le", 8);
                var indexBuf = new BN(d.index).toArrayLike(Buffer, "le", 4);
                var factorBuf = new FactorSerial(d.factor).serial();
                dataBuf.push(fromBuf, numBuf, indexBuf, factorBuf);
            }
            return Buffer.concat(dataBuf);
        }
        return Buffer.alloc(4, 0);
    };
    return SettlesSerial;
}());
export default SettlesSerial;
//# sourceMappingURL=settlesSerial.js.map