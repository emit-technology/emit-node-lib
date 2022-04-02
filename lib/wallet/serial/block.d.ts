/// <reference types="node" />
import { Block } from "../types";
import SerialTrait from "./serial_trait";
declare class BlockSerial implements SerialTrait {
    data: Block;
    constructor(data: Block);
    serial: () => Buffer;
}
export default BlockSerial;
