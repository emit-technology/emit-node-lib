import { fromAddressBytes } from "../address";
var FactorSerial = /** @class */ (function () {
    function FactorSerial(data) {
        this.data = data;
    }
    FactorSerial.prototype.serial = function () {
        var factor = this.data;
        var categoryBuf = new CategorySerial(factor.category).serial();
        var valueBuf = Buffer.from(factor.value, "hex");
        return Buffer.concat([categoryBuf, valueBuf]);
    };
    return FactorSerial;
}());
var CategorySerial = /** @class */ (function () {
    function CategorySerial(data) {
        this.data = data;
    }
    CategorySerial.prototype.serial = function () {
        var category = this.data;
        var addrBuf = fromAddressBytes(category.field); //Buffer.from(category.field, "hex");
        var nameBuf = Buffer.from(category.name, "hex");
        return Buffer.concat([addrBuf, nameBuf]);
    };
    return CategorySerial;
}());
export default FactorSerial;
//# sourceMappingURL=factor.js.map