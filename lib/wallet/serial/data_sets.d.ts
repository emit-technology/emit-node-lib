/// <reference types="node" />
import { DataSet } from "../types";
import SerialTrait from "./serial_trait";
declare class DataSetsSerial implements SerialTrait {
    data: Array<DataSet>;
    constructor(data: Array<DataSet>);
    serial: () => Buffer;
}
export default DataSetsSerial;
