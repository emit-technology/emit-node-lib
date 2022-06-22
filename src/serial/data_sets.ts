import {DataSet} from "../types";
import {VEC_T_MAX_LEN} from "./constants";
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
            const nameBuf = Buffer.from(d.name, "hex");
            const dataLenBuf = new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4)
            const dataBuf = Buffer.from(d.data, "hex")

            bufArr.push(nameBuf);
            bufArr.push(dataLenBuf);
            bufArr.push(dataBuf);

            if(d.old){
                const oldStation = new BN(1).toArrayLike(Buffer, "le", 1)
                const oldLenBuf = new BN(Buffer.from(d.old, "hex").length).toArrayLike(
                    Buffer,
                    "le",
                    4
                )
                const oldBuf = Buffer.from(d.old, "hex")

                bufArr.push(oldStation);
                bufArr.push(oldLenBuf);
                bufArr.push(oldBuf);
            }else{
                const oldStation = new BN(0).toArrayLike(Buffer, "le", 1)
                bufArr.push(oldStation);
            }
        }
        return Buffer.concat(bufArr);
    };
}

export default DataSetsSerial;
