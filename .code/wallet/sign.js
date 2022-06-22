import * as ed from "@noble/ed25519";
import { randomBytes } from "crypto";
import { ED_BASE } from "./serial";
import { fromAddressBytes } from "./address";
import BlockSerial from "./serial/block";
var BN = require("bn.js");
var b2b = require("blake2b");
export function blake2bHash(personal, data) {
    var p = Buffer.alloc(16, 0);
    p.fill(personal, 0, personal.length);
    var hash = b2b(64, null, null, p);
    var out = hash.update(data);
    var buf = out.digest("binary");
    return Buffer.from(buf);
}
export function prepareBlockToHash(prepareBlock) {
    var PREPARE_BLOCK_PERSONAL = "EMIT-PREPARE-BLK";
    var addrBuf = fromAddressBytes(prepareBlock.address);
    var blkHashBuf = Buffer.from(blockToHash(prepareBlock.blk), "hex");
    var bufConcat = Buffer.concat([addrBuf, blkHashBuf]);
    var buf = blake2bHash(PREPARE_BLOCK_PERSONAL, bufConcat);
    return buf.slice(0, 32).toString("hex");
}
export function blockToHash(block) {
    var BLOCK_HASH_PERSONAL = "EMIT-BLOCK-HASH";
    var buf = blake2bHash(BLOCK_HASH_PERSONAL, new BlockSerial(block).serial());
    return buf.slice(0, 32).toString("hex");
}
export function toScalar(bytes) {
    return mod(bytesToNumberLE(bytes), ed.CURVE.n);
}
export function bytesToNumberLE(uint8a) {
    var value = BigInt(0);
    for (var i = 0; i < uint8a.length; i++) {
        value += BigInt(uint8a[i]) << (BigInt(8) * BigInt(i));
    }
    return value;
}
export function mod(a, b) {
    if (b === void 0) { b = ed.CURVE.n; }
    var res = a % b;
    return res >= BigInt(0) ? res : b + res;
}
export function signPrepareBlock(h, privateKey) {
    var m = Buffer.from(h, "hex");
    var r = toScalar(randomBytes(32));
    var R = ED_BASE.multiply(r);
    var sk = toScalar(privateKey.slice(0, 32));
    var concatBuf = Buffer.concat([m, Buffer.from(R.toRawBytes())]);
    var hash = blake2bHash("EMIT-SIGN", concatBuf);
    var e = toScalar(hash.slice(0, 32));
    var s = new BN(mod(mod(sk * e) + r)).toArrayLike(Buffer, "le");
    var sBuf = Buffer.alloc(32, 0);
    sBuf.fill(s, 0, s.length);
    return {
        r: R.toHex(),
        s: sBuf.toString("hex"),
    };
}
//# sourceMappingURL=sign.js.map