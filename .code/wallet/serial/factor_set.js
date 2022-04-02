import SettlesSerial from "./settlesSerial";
import OutsSerial from "./outs";
var FactorSetsSerial = /** @class */ (function () {
    function FactorSetsSerial(data) {
        var _this = this;
        this.serial = function () {
            var settles = _this.data.settles;
            var outs = _this.data.outs;
            var settlesBuf = new SettlesSerial(settles).serial();
            var outsBuf = new OutsSerial(outs).serial();
            return Buffer.concat([settlesBuf, outsBuf]);
        };
        this.data = data;
    }
    return FactorSetsSerial;
}());
export default FactorSetsSerial;
//# sourceMappingURL=factor_set.js.map