import { ADDRESS_BYTES_LEN, ADDRESS_BYTES_PREFIX, ED_BASE, EMIT_ADDR_BS_H0, EMIT_ADDR_BS_H1, } from "./serial";
import { blake2bHash, toScalar } from "./sign";
const bs58 = require("bs58");
export function getPublicKeyBs58(privateKey) {
    try {
        const pk = privateKey.slice(0, 32);
        const pb = ED_BASE.multiply(toScalar(pk));
        const pubKey = Buffer.from(pb.toRawBytes());
        // const pubKey = pb.toRawBytes();
        const prefix = Buffer.from(ADDRESS_BYTES_PREFIX, "hex");
        const h0 = blake2bHash(EMIT_ADDR_BS_H0, Buffer.concat([prefix, pubKey]));
        const h0_r = Buffer.alloc(32, 0);
        h0_r.fill(h0, 0, h0.length > 32 ? 32 : h0.length);
        const h1 = blake2bHash(EMIT_ADDR_BS_H1, Buffer.concat([h0_r, pubKey]));
        const h1_r = Buffer.alloc(32, 0);
        h1_r.fill(h1, 0, h1.length > 32 ? 32 : h1.length);
        const r = Buffer.alloc(ADDRESS_BYTES_LEN, 0);
        const w = Buffer.concat([prefix, pubKey, h1_r.slice(0, 3)]);
        r.fill(w, 0, w.length > ADDRESS_BYTES_LEN ? ADDRESS_BYTES_LEN : w.length);
        return bs58.encode(r);
    }
    catch (e) {
        console.error(e);
    }
    return "";
}
export function getPublicKey(privateKey) {
    const sk = toScalar(privateKey.slice(0, 32));
    const pubKey = Buffer.from(ED_BASE.multiply(sk).toRawBytes());
    const buf = Buffer.alloc(32, 0);
    buf.fill(pubKey, 0, pubKey.length);
    return buf;
}
export function fromAddressBytes(addr) {
    const data = bs58.decode(addr);
    if (data.length != ADDRESS_BYTES_LEN) {
        throw new Error("the address bytes len != 36");
    }
    if (data[0] != 0x1e) {
        throw new Error("the address prefix is invalid");
    }
    const h0 = blake2bHash(EMIT_ADDR_BS_H0, data.slice(0, 33));
    const h0_r = h0.slice(0, 32);
    const h1 = blake2bHash(EMIT_ADDR_BS_H1, Buffer.concat([new Buffer(h0_r), new Buffer(data.slice(1, 33))]));
    const h1_r = h1.slice(0, 32);
    const left = Buffer.from(data.slice(33));
    const right = h1_r.slice(0, 3);
    if (left.toString('hex') != right.toString('hex')) {
        throw new Error("the address bytes sum-check failed");
    }
    return new Buffer(data.slice(1, 33));
}
export function checkSumAddress(addr) {
    try {
        fromAddressBytes(addr);
        return true;
    }
    catch (e) {
        console.log(e);
    }
    return false;
}
//# sourceMappingURL=address.js.map