import SettlesSerial from "./settlesSerial";
import OutsSerial from "./outs";
class FactorSetsSerial {
    constructor(data) {
        this.serial = () => {
            const settles = this.data.settles;
            const outs = this.data.outs;
            const settlesBuf = new SettlesSerial(settles).serial();
            const outsBuf = new OutsSerial(outs).serial();
            return Buffer.concat([settlesBuf, outsBuf]);
        };
        this.data = data;
    }
}
export default FactorSetsSerial;
//# sourceMappingURL=factor_set.js.map