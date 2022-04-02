import { fromAddressBytes } from "../address";
class FactorSerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const factor = this.data;
        const categoryBuf = new CategorySerial(factor.category).serial();
        const valueBuf = Buffer.from(factor.value, "hex");
        return Buffer.concat([categoryBuf, valueBuf]);
    }
}
class CategorySerial {
    constructor(data) {
        this.data = data;
    }
    serial() {
        const category = this.data;
        const addrBuf = fromAddressBytes(category.field); //Buffer.from(category.field, "hex");
        const nameBuf = Buffer.from(category.name, "hex");
        return Buffer.concat([addrBuf, nameBuf]);
    }
}
export default FactorSerial;
//# sourceMappingURL=factor.js.map