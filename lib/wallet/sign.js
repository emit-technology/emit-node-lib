"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signPrepareBlock = exports.bytesToNumberLE = exports.toScalar = exports.blockToHash = exports.prepareBlockToHash = exports.blake2b = void 0;
const ed = require("@noble/ed25519");
const crypto_1 = require("crypto");
const constants_1 = require("./serial/constants");
const address_1 = require("./address");
const block_1 = require("./serial/block");
const BN = require("bn.js");
const b2b = require("blake2b");
function blake2b(personal, data) {
    const p = Buffer.alloc(16, 0);
    p.fill(personal, 0, personal.length);
    const hash = b2b(64, null, null, p);
    const out = hash.update(data);
    const buf = out.digest("binary");
    return Buffer.from(buf);
}
exports.blake2b = blake2b;
function prepareBlockToHash(prepareBlock) {
    const PREPARE_BLOCK_PERSONAL = "EMIT-PREPARE-BLK";
    const addrBuf = (0, address_1.fromAddressBytes)(prepareBlock.address);
    const blkHashBuf = Buffer.from(blockToHash(prepareBlock.blk), "hex");
    const bufConcat = Buffer.concat([addrBuf, blkHashBuf]);
    console.log(bufConcat, "bufConcat buf");
    const buf = blake2b(PREPARE_BLOCK_PERSONAL, bufConcat);
    console.log(buf, "prepare buf");
    return buf.slice(0, 32).toString("hex");
}
exports.prepareBlockToHash = prepareBlockToHash;
function blockToHash(block) {
    const BLOCK_HASH_PERSONAL = "EMIT-BLOCK-HASH";
    const buf = blake2b(BLOCK_HASH_PERSONAL, new block_1.default(block).serial());
    return buf.slice(0, 32).toString("hex");
}
exports.blockToHash = blockToHash;
function toScalar(privateBytes) {
    return mod(bytesToNumberLE(privateBytes), ed.CURVE.n);
}
exports.toScalar = toScalar;
function bytesToNumberLE(uint8a) {
    let value = BigInt(0);
    for (let i = 0; i < uint8a.length; i++) {
        value += BigInt(uint8a[i]) << (BigInt(8) * BigInt(i));
    }
    return value;
}
exports.bytesToNumberLE = bytesToNumberLE;
function mod(a, b = ed.CURVE.n) {
    const res = a % b;
    return res >= BigInt(0) ? res : b + res;
}
function signPrepareBlock(h, privateKey) {
    const m = Buffer.from(h, "hex");
    const r = toScalar((0, crypto_1.randomBytes)(32));
    const sk = toScalar(privateKey.slice(0, 32));
    const R = constants_1.ED_BASE.multiply(r);
    const concatBuf = Buffer.concat([m, R.toRawBytes()]);
    let hash = blake2b("EMIT-SIGN", concatBuf);
    const e = toScalar(hash.slice(0, 32));
    const s = new BN(mod(mod(sk * e) + r)).toArrayLike(Buffer, "le");
    const sBuf = Buffer.alloc(32, 0);
    sBuf.fill(s, 0, s.length);
    return {
        r: R.toHex(),
        s: sBuf.toString("hex"),
    };
}
exports.signPrepareBlock = signPrepareBlock;
//# sourceMappingURL=sign.js.map