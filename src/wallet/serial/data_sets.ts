import { DataSet } from "../types";
import { VEC_T_MAX_LEN } from "./constants";
import SerialTrait from "./serial_trait";
const BN = require("bn.js");

class DataSetsSerial implements SerialTrait {
  data: Array<DataSet>;
  constructor(data: Array<DataSet>) {
    this.data = data;
  }

  serial = (): Buffer => {
    if (this.data && this.data.length > VEC_T_MAX_LEN) {
      throw new Error("INVALID_FORMAT");
    }
    const len = this.data.length;
    const lenBuf = new BN(len).toArrayLike(Buffer, "le", 4);
    const bufArr: Array<Buffer> = [lenBuf];
    for (let d of this.data) {
      bufArr.push(
        Buffer.concat([
          Buffer.from(d.name, "hex"),
          new BN(Buffer.from(d.data, "hex").length).toArrayLike(
            Buffer,
            "le",
            4
          ),
          Buffer.from(d.data, "hex"),
        ])
      );
    }
    return Buffer.concat(bufArr);
  };
}

export default DataSetsSerial;
