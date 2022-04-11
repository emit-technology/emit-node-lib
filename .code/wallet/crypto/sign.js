import { mod, signPrepareBlock, toScalar } from "../sign";
import { fromAddressBytes, getPublicKeyBs58 } from "../address";
import { ED_BASE } from "../serial";
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
    var R = toPoint(signEL.r);
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
export var toPoint = function (rHex) {
    var rb = Buffer.from(rHex, "hex");
    var r = toScalar(rb);
    var R = ED_BASE.multiply(r);
    return R;
};
//TODO
export var verify = function (m, sig, publicKey) {
    var left = ED_BASE.multiply(sig.s);
    var e = toScalar(sig.R.toRawBytes());
    var s = new BN(mod(mod(toScalar(publicKey.slice(0, 32)) * e) + toScalar(sig.R.toRawBytes()))).toArrayLike(Buffer, "le");
    var right = Buffer.alloc(32, 0);
    right.fill(s, 0, s.length);
    console.log(Buffer.from(left.toRawBytes()), right);
    return Buffer.from(left.toRawBytes()).toString('hex') == right.toString('hex');
};
//# sourceMappingURL=sign.js.map