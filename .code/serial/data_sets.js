"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var BN = require("bn.js");
var DataSetsSerial = /** @class */ (function () {
    function DataSetsSerial(data) {
        var _this = this;
        this.serial = function () {
            if (_this.data && _this.data.length > constants_1.VEC_T_MAX_LEN) {
                throw new Error("INVALID_FORMAT");
            }
            var len = _this.data.length;
            var lenBuf = new BN(len).toArrayLike(Buffer, "le", 4);
            var bufArr = [lenBuf];
            for (var _i = 0, _a = _this.data; _i < _a.length; _i++) {
                var d = _a[_i];
                var nameBuf = Buffer.from(d.name, "hex");
                var dataLenBuf = new BN(Buffer.from(d.data, "hex").length).toArrayLike(Buffer, "le", 4);
                var dataBuf = Buffer.from(d.data, "hex");
                bufArr.push(nameBuf);
                bufArr.push(dataLenBuf);
                bufArr.push(dataBuf);
                if (d.old) {
                    var oldStation = new BN(1).toArrayLike(Buffer, "le", 1);
                    var oldLenBuf = new BN(Buffer.from(d.old, "hex").length).toArrayLike(Buffer, "le", 4);
                    var oldBuf = Buffer.from(d.old, "hex");
                    bufArr.push(oldStation);
                    bufArr.push(oldLenBuf);
                    bufArr.push(oldBuf);
                }
                else {
                    var oldStation = new BN(0).toArrayLike(Buffer, "le", 1);
                    bufArr.push(oldStation);
                }
            }
            return Buffer.concat(bufArr);
        };
        this.data = data;
    }
    return DataSetsSerial;
}());
exports.default = DataSetsSerial;
//# sourceMappingURL=data_sets.js.map