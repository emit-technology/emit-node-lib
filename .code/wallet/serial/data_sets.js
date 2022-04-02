import { VEC_T_MAX_LEN } from "./constants";
var BN = require("bn.js");
var DataSetsSerial = /** @class */ (function () {
    function DataSetsSerial(data) {
        var _this = this;
        this.serial = function () {
            if (_this.data && _this.data.length > VEC_T_MAX_LEN) {
                throw new Error("INVALID_FORMAT");
            }
            var len = _this.data.length;
            var lenBuf = new BN(len).toArrayLike(Buffer, "le", 4);
            var bufArr = [lenBuf];
            for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                var d = _a[_i];
                bufArr.push(Buffer.concat([
                    Buffer.from(d.name, "hex"),
                    new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4),
                    Buffer.from(d.data, "hex"),
                ]));
            }
            return Buffer.concat(bufArr);
        };
        this.data = data;
    }
    return DataSetsSerial;
}());
export default DataSetsSerial;
//# sourceMappingURL=data_sets.js.map