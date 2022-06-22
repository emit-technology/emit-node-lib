/// <reference types="node" />
import { Settle } from "../types";
import SerialTrait from "./serial_trait";
declare class SettlesSerial implements SerialTrait {
    data: Array<Settle>;
    constructor(data: Array<Settle>);
    serial(): Buffer;
}
export default SettlesSerial;
