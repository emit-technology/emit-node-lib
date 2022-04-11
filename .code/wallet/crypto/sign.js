import { blake2bHash, signPrepareBlock, toScalar } from "../sign";
import { fromAddressBytes, getPublicKeyBs58 } from "../address";
import { ED_BASE } from "../serial";
import * as ed from "@noble/ed25519";
import { toBuffer } from "../utils";
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
    var m = Buffer.from(h, "hex");
    if (verify(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
export var verify = function (m, sig, publicKey) {
    var left = ED_BASE.multiply(sig.s);
    var pkHex = new BN(publicKey).toString("hex");
    var concatBuf = Buffer.concat([m, sig.R.toRawBytes()]);
    var hash = blake2bHash("EMIT-SIGN", concatBuf);
    var e = toScalar(hash.slice(0, 32));
    var right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
export var personalSign = function (privateKey, msgParams) {
    ecsign("");
};
export var recoverPersonalSignature = function (sig) {
};
export var hashPersonalMessage = function (message) {
    var prefix = toBuffer('\x19Ethereum Signed Message:\n' + message.length.toString());
    return exports.keccak(Buffer.concat([prefix, message]));
};
//# sourceMappingURL=sign.js.map