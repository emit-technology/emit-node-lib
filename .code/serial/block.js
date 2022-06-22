"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var data_sets_1 = tslib_1.__importDefault(require("./data_sets"));
var constants_1 = require("./constants");
var factor_set_1 = tslib_1.__importDefault(require("./factor_set"));
var BN = require("bn.js");
var BlockSerial = /** @class */ (function () {
    function BlockSerial(data) {
        var _this = this;
        this.serial = function () {
            var block = _this.data;
            var numBuf = new BN(block.num).toArrayLike(Buffer, "le", 8);
            var timeBuf = new BN(block.timestamp).toArrayLike(Buffer, "le", 8);
            var parentHashBuf = Buffer.from(block.parent_hash, "hex"); //32 bytes
            var dataSetBuf = new data_sets_1.default(block.data_sets).serial();
            var factorSetBuf = new factor_set_1.default(block.factor_set).serial();
            var bufArr = [
                numBuf,
                timeBuf,
                parentHashBuf,
                dataSetBuf,
                factorSetBuf,
            ];
            if (block.data) {
                if (block.data.length > constants_1.BYTES_MAX_LEN) {
                    throw new Error("Bytes content is too big");
                }
                bufArr.push(new BN(Buffer.from(block.data, "hex").length).toArrayLike(Buffer, "le", 4));
                bufArr.push(Buffer.from(block.data, "hex"));
            }
            else {
                bufArr.push(Buffer.alloc(4, 0).fill(""));
            }
            var r = Buffer.concat(bufArr);
            return r;
        };
        this.data = data;
    }
    return BlockSerial;
}());
exports.default = BlockSerial;
//# sourceMappingURL=block.js.map