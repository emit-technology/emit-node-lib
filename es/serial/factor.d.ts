/// <reference types="node" />
import SerialTrait from "./serial_trait";
import { Factor } from "../types";
declare class FactorSerial implements SerialTrait {
    data: Factor;
    constructor(data: Factor);
    serial(): Buffer;
}
export default FactorSerial;
