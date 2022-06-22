"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const settlesSerial_1 = tslib_1.__importDefault(require("./settlesSerial"));
const outs_1 = tslib_1.__importDefault(require("./outs"));
class FactorSetsSerial {
    constructor(data) {
        this.serial = () => {
            const settles = this.data.settles;
            const outs = this.data.outs;
            const settlesBuf = new settlesSerial_1.default(settles).serial();
            const outsBuf = new outs_1.default(outs).serial();
            return Buffer.concat([settlesBuf, outsBuf]);
        };
        this.data = data;
    }
}
exports.default = FactorSetsSerial;
//# sourceMappingURL=factor_set.js.map