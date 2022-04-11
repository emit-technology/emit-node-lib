"use strict";
exports.__esModule = true;
exports.verify = exports.toPoint = exports.ecrecover = exports.ecsign = void 0;
var sign_1 = require("../sign");
var address_1 = require("../address");
var serial_1 = require("../serial");
var ed = require("@noble/ed25519");
var BN = require('bn.js');
var ecsign = function (m, privateKey) {
    var sign = sign_1.signPrepareBlock(m, privateKey);
    return {
        r: sign.r,
        s: sign.s,
        v: address_1.getPublicKeyBs58(privateKey)
    };
};
exports.ecsign = ecsign;
var ecrecover = function (signEL, h) {
    var s = sign_1.toScalar(Buffer.from(signEL.s, "hex"));
    var R = ed.RistrettoPoint.fromHex(signEL.r);
    var sig = {
        s: s,
        R: R
    };
    var pb = address_1.fromAddressBytes(signEL.v);
    console.log("pk:", new BN(pb).toArrayLike(Buffer, 'le').toString('hex'));
    var m = Buffer.from(h, "hex");
    if (exports.verify(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
exports.ecrecover = ecrecover;
var toPoint = function (rHex) {
    var rb = Buffer.from(rHex, "hex");
    var r = sign_1.toScalar(rb);
    var R = serial_1.ED_BASE.multiply(r);
    return R;
};
exports.toPoint = toPoint;
//TODO
var verify = function (m, sig, publicKey) {
    var left = serial_1.ED_BASE.multiply(sig.s);
    var pkHex = new BN(publicKey).toString("hex");
    console.log(pkHex, "pkHex");
    var concatBuf = Buffer.concat([m, sig.R.toRawBytes()]);
    var hash = sign_1.blake2bHash("EMIT-SIGN", concatBuf);
    var e = sign_1.toScalar(hash.slice(0, 32));
    console.log("verify e: ", new BN(e).toArrayLike(Buffer, "le").toString("hex"));
    console.log("verify s: ", new BN(sig.s).toArrayLike(Buffer, "le").toString("hex"));
    console.log("verify R: ", new BN(sig.R.toRawBytes()).toArrayLike(Buffer, "le").toString("hex"));
    var right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
exports.verify = verify;
