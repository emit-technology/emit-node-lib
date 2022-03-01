import { FactorSet } from "../types";
import SerialTrait from "./serial_trait";
import SettlesSerial from "./settlesSerial";
import OutsSerial from "./outs";

class FactorSetsSerial implements SerialTrait {
  data: FactorSet;
  constructor(data: FactorSet) {
    this.data = data;
  }

  serial = (): Buffer => {
    const settles = this.data.settles;
    const outs = this.data.outs;
    const settlesBuf = new SettlesSerial(settles).serial();
    const outsBuf = new OutsSerial(outs).serial();
    return Buffer.concat([settlesBuf, outsBuf]);
  };
}

export default FactorSetsSerial;
