import SerialTrait from "./serial_trait";
import { Category, Factor } from "../types";
import { fromAddressBytes } from "../address";
const BN = require("bn.js");

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
    const supplierBuf = fromAddressBytes(category.supplier); //Buffer.from(category.field, "hex");
    const symbolBuf = Buffer.from(category.symbol, "hex");
    const symbolLenBuf = new BN(symbolBuf.length).toArrayLike(Buffer, "le", 4);
    const idBuf = Buffer.from(category.id, "hex");
    const idLenBuf = new BN(idBuf.length).toArrayLike(Buffer, "le", 4);
    return Buffer.concat([supplierBuf,symbolLenBuf, symbolBuf,idLenBuf,idBuf]);
  }
}

export default FactorSerial;
