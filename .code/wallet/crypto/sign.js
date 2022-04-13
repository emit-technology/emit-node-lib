import { blake2bHash, signPrepareBlock, toScalar } from "../sign";
import { fromAddressBytes, getPublicKeyBs58 } from "../address";
import { ED_BASE } from "../serial";
import * as ed from "@noble/ed25519";
import * as ethUtil from 'ethereumjs-util';
import { toBuffer } from "ethereumjs-util";
var BN = require('bn.js');
export var ecsign = function (m, privateKey) {
    var sign = signPrepareBlock(m, privateKey);
    return {
        r: sign.r,
        s: sign.s,
        v: getPublicKeyBs58(privateKey)
    };
};
export var ecrecover = function (signEL, h) {
    var s = toScalar(Buffer.from(signEL.s, "hex"));
    var R = ed.RistrettoPoint.fromHex(signEL.r);
    var sig = {
        s: s,
        R: R
    };
    var pb = fromAddressBytes(signEL.v);
    var m = toBuffer(h);
    if (verify(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
export var verify = function (m, sig, publicKey) {
    var left = ED_BASE.multiply(sig.s);
    var pkHex = new BN(publicKey).toString("hex");
    var concatBuf = Buffer.concat([m, Buffer.from(sig.R.toRawBytes())]);
    var hash = blake2bHash("EMIT-SIGN", concatBuf);
    var e = toScalar(hash.slice(0, 32));
    var right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
export var personalSign = function (privateKey, msgParams) {
    var msgBuf = ethUtil.toBuffer(msgParams);
    var msgHash = ethUtil.hashPersonalMessage(msgBuf);
    var str = msgHash.toString("hex");
    return ecsign(str, privateKey);
};
export var recoverPersonalSignature = function (sig, msgHex) {
    return ecrecover(sig, msgHex);
};
//# sourceMappingURL=sign.js.map