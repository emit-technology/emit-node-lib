"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSumAddress = exports.fromAddressBytes = exports.getPublicKey = exports.getPublicKeyBs58 = void 0;
const serial_1 = require("./serial");
const sign_1 = require("./sign");
const bs58 = require("bs58");
function getPublicKeyBs58(privateKey) {
    try {
        const pk = privateKey.slice(0, 32);
        const pb = serial_1.ED_BASE.multiply((0, sign_1.toScalar)(pk));
        const pubKey = Buffer.from(pb.toRawBytes());
        // const pubKey = pb.toRawBytes();
        const prefix = Buffer.from(serial_1.ADDRESS_BYTES_PREFIX, "hex");
        const h0 = (0, sign_1.blake2bHash)(serial_1.EMIT_ADDR_BS_H0, Buffer.concat([prefix, pubKey]));
        const h0_r = Buffer.alloc(32, 0);
        h0_r.fill(h0, 0, h0.length > 32 ? 32 : h0.length);
        const h1 = (0, sign_1.blake2bHash)(serial_1.EMIT_ADDR_BS_H1, Buffer.concat([h0_r, pubKey]));
        const h1_r = Buffer.alloc(32, 0);
        h1_r.fill(h1, 0, h1.length > 32 ? 32 : h1.length);
        const r = Buffer.alloc(serial_1.ADDRESS_BYTES_LEN, 0);
        const w = Buffer.concat([prefix, pubKey, h1_r.slice(0, 3)]);
        r.fill(w, 0, w.length > serial_1.ADDRESS_BYTES_LEN ? serial_1.ADDRESS_BYTES_LEN : w.length);
        return bs58.encode(r);
    }
    catch (e) {
        console.error(e);
    }
    return "";
}
exports.getPublicKeyBs58 = getPublicKeyBs58;
function getPublicKey(privateKey) {
    const sk = (0, sign_1.toScalar)(privateKey.slice(0, 32));
    const pubKey = Buffer.from(serial_1.ED_BASE.multiply(sk).toRawBytes());
    const buf = Buffer.alloc(32, 0);
    buf.fill(pubKey, 0, pubKey.length);
    return buf;
}
exports.getPublicKey = getPublicKey;
function fromAddressBytes(addr) {
    const data = bs58.decode(addr);
    if (data.length != serial_1.ADDRESS_BYTES_LEN) {
        throw new Error("the address bytes len != 36");
    }
    if (data[0] != 0x1e) {
        throw new Error("the address prefix is invalid");
    }
    const h0 = (0, sign_1.blake2bHash)(serial_1.EMIT_ADDR_BS_H0, data.slice(0, 33));
    const h0_r = h0.slice(0, 32);
    const h1 = (0, sign_1.blake2bHash)(serial_1.EMIT_ADDR_BS_H1, Buffer.concat([new Buffer(h0_r), new Buffer(data.slice(1, 33))]));
    const h1_r = h1.slice(0, 32);
    const left = Buffer.from(data.slice(33));
    const right = h1_r.slice(0, 3);
    if (left.toString('hex') != right.toString('hex')) {
        throw new Error("the address bytes sum-check failed");
    }
    return new Buffer(data.slice(1, 33));
}
exports.fromAddressBytes = fromAddressBytes;
function checkSumAddress(addr) {
    try {
        fromAddressBytes(addr);
        return true;
    }
    catch (e) {
        console.log(e);
    }
    return false;
}
exports.checkSumAddress = checkSumAddress;
//# sourceMappingURL=address.js.map