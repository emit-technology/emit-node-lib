"use strict";
exports.__esModule = true;
exports.signPrepareBlock = exports.mod = exports.bytesToNumberLE = exports.toScalar = exports.blockToHash = exports.prepareBlockToHash = exports.blake2bHash = void 0;
var ed = require("@noble/ed25519");
// import { randomBytes } from "crypto";
var constants_1 = require("./serial/constants");
var address_1 = require("./address");
var block_1 = require("./serial/block");
var BN = require("bn.js");
var b2b = require("blake2b");
function blake2bHash(personal, data) {
    var p = Buffer.alloc(16, 0);
    p.fill(personal, 0, personal.length);
    var hash = b2b(64, null, null, p);
    var out = hash.update(data);
    var buf = out.digest("binary");
    return Buffer.from(buf);
}
exports.blake2bHash = blake2bHash;
function prepareBlockToHash(prepareBlock) {
    var PREPARE_BLOCK_PERSONAL = "EMIT-PREPARE-BLK";
    var addrBuf = address_1.fromAddressBytes(prepareBlock.address);
    var blkHashBuf = Buffer.from(blockToHash(prepareBlock.blk), "hex");
    var bufConcat = Buffer.concat([addrBuf, blkHashBuf]);
    var buf = blake2bHash(PREPARE_BLOCK_PERSONAL, bufConcat);
    return buf.slice(0, 32).toString("hex");
}
exports.prepareBlockToHash = prepareBlockToHash;
function blockToHash(block) {
    var BLOCK_HASH_PERSONAL = "EMIT-BLOCK-HASH";
    var buf = blake2bHash(BLOCK_HASH_PERSONAL, new block_1["default"](block).serial());
    return buf.slice(0, 32).toString("hex");
}
exports.blockToHash = blockToHash;
function toScalar(bytes) {
    return mod(bytesToNumberLE(bytes), ed.CURVE.n);
}
exports.toScalar = toScalar;
function bytesToNumberLE(uint8a) {
    var value = BigInt(0);
    for (var i = 0; i < uint8a.length; i++) {
        value += BigInt(uint8a[i]) << (BigInt(8) * BigInt(i));
    }
    return value;
}
exports.bytesToNumberLE = bytesToNumberLE;
function mod(a, b) {
    if (b === void 0) { b = ed.CURVE.n; }
    var res = a % b;
    return res >= BigInt(0) ? res : b + res;
}
exports.mod = mod;
function signPrepareBlock(h, privateKey) {
    var m = Buffer.from(h, "hex");
    // const r = toScalar(randomBytes(32));
    var r = toScalar(Buffer.from("48b20db18b6350ff21e2dfa0346a99e9a44333e8eb50c406c79924b77005fe0d", "hex"));
    var R = constants_1.ED_BASE.multiply(r);
    var sk = toScalar(privateKey.slice(0, 32));
    var concatBuf = Buffer.concat([m, R.toRawBytes()]);
    var hash = blake2bHash("EMIT-SIGN", concatBuf);
    var e = toScalar(hash.slice(0, 32));
    var s = new BN(mod(mod(sk * e) + r)).toArrayLike(Buffer, "le");
    var sBuf = Buffer.alloc(32, 0);
    sBuf.fill(s, 0, s.length);
    return {
        r: R.toHex(),
        s: sBuf.toString("hex")
    };
}
exports.signPrepareBlock = signPrepareBlock;
