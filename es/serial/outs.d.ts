/// <reference types="node" />
import { Out } from "../types";
import SerialTrait from "./serial_trait";
declare class OutsSerial implements SerialTrait {
    data: Array<Out>;
    constructor(data: Array<Out>);
    serial(): Buffer;
}
export default OutsSerial;
