"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPersonalSignature = exports.hashPersonalMessage = exports.personalSign = exports.verify = exports.ecrecover = exports.ecsign = void 0;
var tslib_1 = require("tslib");
var sign_1 = require("../sign");
var address_1 = require("../address");
var serial_1 = require("../serial");
var ed = tslib_1.__importStar(require("@noble/ed25519"));
var ethUtil = tslib_1.__importStar(require("ethereumjs-util"));
var ethereumjs_util_1 = require("ethereumjs-util");
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
    var m = ethereumjs_util_1.toBuffer(h);
    if (exports.verify(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
exports.ecrecover = ecrecover;
var verify = function (m, sig, publicKey) {
    var left = serial_1.ED_BASE.multiply(sig.s);
    var pkHex = new BN(publicKey).toString("hex");
    var concatBuf = Buffer.concat([m, Buffer.from(sig.R.toRawBytes())]);
    var hash = sign_1.blake2bHash("EMIT-SIGN", concatBuf);
    var e = sign_1.toScalar(hash.slice(0, 32));
    var right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
exports.verify = verify;
var personalSign = function (privateKey, msgParams) {
    var msgBuf = ethUtil.toBuffer(msgParams);
    var msgHash = exports.hashPersonalMessage(msgBuf);
    var str = msgHash.toString("hex");
    return exports.ecsign(str, privateKey);
};
exports.personalSign = personalSign;
var hashPersonalMessage = function (message) {
    var prefix = Buffer.from("\u0019EMIT Signed Message:\n" + message.length, 'utf-8');
    return ethUtil.keccak(Buffer.concat([prefix, message]));
};
exports.hashPersonalMessage = hashPersonalMessage;
var recoverPersonalSignature = function (sig, msgHex) {
    return exports.ecrecover(sig, msgHex);
};
exports.recoverPersonalSignature = recoverPersonalSignature;
//# sourceMappingURL=sign.js.map