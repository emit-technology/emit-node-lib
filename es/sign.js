import * as ed from "@noble/ed25519";
import { randomBytes } from "crypto";
import { ED_BASE } from "./serial";
import { fromAddressBytes } from "./address";
import BlockSerial from "./serial/block";
const BN = require("bn.js");
const b2b = require("blake2b");
export function blake2bHash(personal, data) {
    const p = Buffer.alloc(16, 0);
    p.fill(personal, 0, personal.length);
    const hash = b2b(64, null, null, p);
    const out = hash.update(data);
    const buf = out.digest("binary");
    return Buffer.from(buf);
}
export function prepareBlockToHash(prepareBlock) {
    const PREPARE_BLOCK_PERSONAL = "EMIT-PREPARE-BLK";
    const addrBuf = fromAddressBytes(prepareBlock.address);
    const blkHashBuf = Buffer.from(blockToHash(prepareBlock.blk), "hex");
    const bufConcat = Buffer.concat([addrBuf, blkHashBuf]);
    const buf = blake2bHash(PREPARE_BLOCK_PERSONAL, bufConcat);
    return buf.slice(0, 32).toString("hex");
}
export function blockToHash(block) {
    const BLOCK_HASH_PERSONAL = "EMIT-BLOCK-HASH";
    const buf = blake2bHash(BLOCK_HASH_PERSONAL, new BlockSerial(block).serial());
    return buf.slice(0, 32).toString("hex");
}
export function toScalar(bytes) {
    return mod(bytesToNumberLE(bytes), ed.CURVE.n);
}
export function bytesToNumberLE(uint8a) {
    let value = BigInt(0);
    for (let i = 0; i < uint8a.length; i++) {
        value += BigInt(uint8a[i]) << (BigInt(8) * BigInt(i));
    }
    return value;
}
export function mod(a, b = ed.CURVE.n) {
    const res = a % b;
    return res >= BigInt(0) ? res : b + res;
}
export function signPrepareBlock(h, privateKey) {
    const m = Buffer.from(h, "hex");
    const r = toScalar(randomBytes(32));
    const R = ED_BASE.multiply(r);
    const sk = toScalar(privateKey.slice(0, 32));
    const concatBuf = Buffer.concat([m, Buffer.from(R.toRawBytes())]);
    let hash = blake2bHash("EMIT-SIGN", concatBuf);
    const e = toScalar(hash.slice(0, 32));
    const s = new BN(mod(mod(sk * e) + r)).toArrayLike(Buffer, "le");
    const sBuf = Buffer.alloc(32, 0);
    sBuf.fill(s, 0, s.length);
    return {
        r: R.toHex(),
        s: sBuf.toString("hex"),
    };
}
//# sourceMappingURL=sign.js.map