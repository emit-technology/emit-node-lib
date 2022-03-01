"use strict";
exports.__esModule = true;
exports.signPrepareBlock = exports.bytesToNumberLE = exports.toScalar = exports.blockToHash = exports.prepareBlockToHash = exports.blake2b = void 0;
var ed = require("noble-ed25519");
var crypto_1 = require("crypto");
var constants_1 = require("./serial/constants");
var address_1 = require("./address");
var block_1 = require("./serial/block");
var BN = require("bn.js");
var b2b = require("blake2b");
function blake2b(personal, data) {
    var p = Buffer.alloc(16, 0);
    p.fill(personal, 0, personal.length);
    var hash = b2b(64, null, null, p);
    var out = hash.update(data);
    var buf = out.digest("binary");
    return Buffer.from(buf);
}
exports.blake2b = blake2b;
function prepareBlockToHash(prepareBlock) {
    var PREPARE_BLOCK_PERSONAL = "EMIT-PREPARE-BLK";
    var addrBuf = address_1.fromAddressBytes(prepareBlock.address);
    var blkHashBuf = Buffer.from(blockToHash(prepareBlock.blk), "hex");
    var bufConcat = Buffer.concat([addrBuf, blkHashBuf]);
    console.log(bufConcat, "bufConcat buf");
    var buf = blake2b(PREPARE_BLOCK_PERSONAL, bufConcat);
    console.log(buf, "prepare buf");
    return buf.slice(0, 32).toString("hex");
}
exports.prepareBlockToHash = prepareBlockToHash;
function blockToHash(block) {
    var BLOCK_HASH_PERSONAL = "EMIT-BLOCK-HASH";
    var buf = blake2b(BLOCK_HASH_PERSONAL, new block_1["default"](block).serial());
    return buf.slice(0, 32).toString("hex");
}
exports.blockToHash = blockToHash;
function toScalar(privateBytes) {
    return mod(bytesToNumberLE(privateBytes), ed.CURVE.n);
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
function signPrepareBlock(h, privateKey) {
    var m = Buffer.from(h, "hex");
    var r = toScalar(crypto_1.randomBytes(32));
    var sk = toScalar(privateKey.slice(0, 32));
    var R = constants_1.ED_BASE.multiply(r);
    var concatBuf = Buffer.concat([m, Buffer.from(R.toRistrettoBytes())]);
    var hash = blake2b("EMIT-SIGN", concatBuf);
    var e = toScalar(hash.slice(0, 32));
    var s = new BN(mod(mod(sk * e) + r)).toArrayLike(Buffer, "le");
    var sBuf = Buffer.alloc(32, 0);
    sBuf.fill(s, 0, s.length);
    return {
        r: Buffer.from(R.toRistrettoBytes()).toString("hex"),
        s: sBuf.toString("hex")
    };
}
exports.signPrepareBlock = signPrepareBlock;
