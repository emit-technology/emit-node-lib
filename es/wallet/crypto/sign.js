import { blake2bHash, signPrepareBlock, toScalar } from "../sign";
import { fromAddressBytes, getPublicKeyBs58 } from "../address";
import { ED_BASE } from "../serial";
import * as ed from "@noble/ed25519";
import * as ethUtil from 'ethereumjs-util';
import { toBuffer } from "ethereumjs-util";
const BN = require('bn.js');
export const ecsign = (m, privateKey) => {
    const sign = signPrepareBlock(m, privateKey);
    return {
        r: sign.r,
        s: sign.s,
        v: getPublicKeyBs58(privateKey)
    };
};
export const ecrecover = (signEL, h) => {
    const s = toScalar(Buffer.from(signEL.s, "hex"));
    const R = ed.RistrettoPoint.fromHex(signEL.r);
    const sig = {
        s: s,
        R: R
    };
    const pb = fromAddressBytes(signEL.v);
    const m = toBuffer(h);
    if (verify(m, sig, pb)) {
        return signEL.v;
    }
    return "Invalid sig";
};
export const verify = (m, sig, publicKey) => {
    const left = ED_BASE.multiply(sig.s);
    const pkHex = new BN(publicKey).toString("hex");
    const concatBuf = Buffer.concat([m, Buffer.from(sig.R.toRawBytes())]);
    let hash = blake2bHash("EMIT-SIGN", concatBuf);
    const e = toScalar(hash.slice(0, 32));
    const right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R); //;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
    return left.equals(right);
};
export const personalSign = (privateKey, msgParams) => {
    const msgBuf = ethUtil.toBuffer(msgParams);
    const msgHash = ethUtil.hashPersonalMessage(msgBuf);
    const str = msgHash.toString("hex");
    return ecsign(str, privateKey);
};
export const recoverPersonalSignature = (sig, msgHex) => {
    return ecrecover(sig, msgHex);
};
//# sourceMappingURL=sign.js.map