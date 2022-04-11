"use strict";
exports.__esModule = true;
exports.fromAddressBytes = exports.getPublicKey = exports.getPublicKeyBs58 = void 0;
var serial_1 = require("./serial");
var sign_1 = require("./sign");
var bs58 = require("bs58");
function getPublicKeyBs58(privateKey) {
    var pk = privateKey.slice(0, 32);
    var pb = serial_1.ED_BASE.multiply(sign_1.toScalar(pk));
    // const pubKey = Buffer.from(pb.toRistrettoBytes());
    var pubKey = pb.toRawBytes();
    var prefix = Buffer.from(serial_1.ADDRESS_BYTES_PREFIX, "hex");
    var h0 = sign_1.blake2bHash(serial_1.EMIT_ADDR_BS_H0, Buffer.concat([prefix, pubKey]));
    var h0_r = Buffer.alloc(32, 0);
    h0_r.fill(h0, 0, h0.length > 32 ? 32 : h0.length);
    var h1 = sign_1.blake2bHash(serial_1.EMIT_ADDR_BS_H1, Buffer.concat([h0_r, pubKey]));
    var h1_r = Buffer.alloc(32, 0);
    h1_r.fill(h1, 0, h1.length > 32 ? 32 : h1.length);
    var r = Buffer.alloc(serial_1.ADDRESS_BYTES_LEN, 0);
    var w = Buffer.concat([prefix, pubKey, h1_r.slice(0, 3)]);
    r.fill(w, 0, w.length > serial_1.ADDRESS_BYTES_LEN ? serial_1.ADDRESS_BYTES_LEN : w.length);
    return bs58.encode(r);
}
exports.getPublicKeyBs58 = getPublicKeyBs58;
function getPublicKey(privateKey) {
    var sk = sign_1.toScalar(privateKey.slice(0, 32));
    var pubKey = serial_1.ED_BASE.multiply(sk).toRawBytes();
    var buf = Buffer.alloc(32, 0);
    buf.fill(pubKey, 0, pubKey.length);
    return buf;
}
exports.getPublicKey = getPublicKey;
function fromAddressBytes(addr) {
    var data = bs58.decode(addr);
    if (data.length != serial_1.ADDRESS_BYTES_LEN) {
        throw new Error("the address bytes len != 36");
    }
    if (data[0] != 0x1e) {
        throw new Error("the address prefix is invalid");
    }
    var h0 = sign_1.blake2bHash(serial_1.EMIT_ADDR_BS_H0, data.slice(0, 33));
    var h0_r = h0.slice(0, 32);
    var h1 = sign_1.blake2bHash(serial_1.EMIT_ADDR_BS_H1, Buffer.concat([h0_r, data.slice(1, 33)]));
    var h1_r = h1.slice(0, 32);
    var left = Buffer.from(data.slice(33));
    var right = h1_r.slice(0, 3);
    console.log(left, right);
    if (left.toString('hex') != right.toString('hex')) {
        throw new Error("the address bytes sum-check failed");
    }
    console.log(data.slice(1, 33));
    return data.slice(1, 33);
}
exports.fromAddressBytes = fromAddressBytes;
