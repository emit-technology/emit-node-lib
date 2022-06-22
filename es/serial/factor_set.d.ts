/// <reference types="node" />
import { FactorSet } from "../types";
import SerialTrait from "./serial_trait";
declare class FactorSetsSerial implements SerialTrait {
    data: FactorSet;
    constructor(data: FactorSet);
    serial: () => Buffer;
}
export default FactorSetsSerial;
