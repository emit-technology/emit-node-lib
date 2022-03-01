import SerialTrait from "./serial_trait";
import { Category, Factor } from "../types";
import { fromAddressBytes } from "../address";

class FactorSerial implements SerialTrait {
  data: Factor;
  constructor(data: Factor) {
    this.data = data;
  }
  serial(): Buffer {
    const factor = this.data;
    const categoryBuf = new CategorySerial(factor.category).serial();
    const valueBuf = Buffer.from(factor.value, "hex");
    return Buffer.concat([categoryBuf, valueBuf]);
  }
}

class CategorySerial implements SerialTrait {
  data: Category;
  constructor(data: Category) {
    this.data = data;
  }
  serial(): Buffer {
    const category = this.data;
    const addrBuf = fromAddressBytes(category.field); //Buffer.from(category.field, "hex");
    const nameBuf = Buffer.from(category.name, "hex");
    return Buffer.concat([addrBuf, nameBuf]);
  }
}

export default FactorSerial;
