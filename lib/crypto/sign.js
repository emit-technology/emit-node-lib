"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverPersonalSignature = exports.hashPersonalMessage = exports.personalSign = exports.verify = exports.ecrecover = exports.ecsign = void 0;
const tslib_1 = require("tslib");
const sign_1 = require("../sign");
const address_1 = require("../address");
const serial_1 = require("../serial");
const ed = tslib_1.__importStar(require("@noble/ed25519"));
const ethUtil = tslib_1.__importStar(require("ethereumjs-util"));
const ethereumjs_util_1 = require("ethereumjs-util");
const BN = require('bn.js');
const ecsign = (m, privateKey) => {
    const sign = (0, sign_1.signPrepareBlock)(m, privateKey);
    return {
        r: sign.r,
        s: sign.s,
        v: (0, address_1.getPublicKeyBs58)(privateKey)
    };
};
exports.ecsign = ecsign;
const ecrecover = (signEL, h) => {
    const s = (0, sign_1.toScalar)(Buffer.from(signEL.s, "hex"));
    const R = ed.RistrettoPoint.fromHex(signEL.r);
    const sig = {
        s: s,
        R: R
    };
    const pb = (0, address_1.fromAddressBytes)(signEL.v);
    const m = (0, ethereumjs_util_1.toBuffer)(h);
    if ((0, exports.verify)(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
exports.ecrecover = ecrecover;
const verify = (m, sig, publicKey) => {
    const left = serial_1.ED_BASE.multiply(sig.s);
    const pkHex = new BN(publicKey).toString("hex");
    const concatBuf = Buffer.concat([m, Buffer.from(sig.R.toRawBytes())]);
    let hash = (0, sign_1.blake2bHash)("EMIT-SIGN", concatBuf);
    const e = (0, sign_1.toScalar)(hash.slice(0, 32));
    const right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
exports.verify = verify;
const personalSign = (privateKey, msgParams) => {
    const msgBuf = ethUtil.toBuffer(msgParams);
    const msgHash = (0, exports.hashPersonalMessage)(msgBuf);
    const str = msgHash.toString("hex");
    return (0, exports.ecsign)(str, privateKey);
};
exports.personalSign = personalSign;
const hashPersonalMessage = function (message) {
    const prefix = Buffer.from(`\u0019EMIT Signed Message:\n${message.length}`, 'utf-8');
    return ethUtil.keccak(Buffer.concat([prefix, message]));
};
exports.hashPersonalMessage = hashPersonalMessage;
const recoverPersonalSignature = (sig, msgHex) => {
    return (0, exports.ecrecover)(sig, msgHex);
};
exports.recoverPersonalSignature = recoverPersonalSignature;
//# sourceMappingURL=sign.js.map