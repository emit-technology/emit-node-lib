import {SignEL} from "../types/crypto";
import {blake2bHash, signPrepareBlock, toScalar} from "../sign";
import {fromAddressBytes, getPublicKeyBs58} from "../address";
import {ED_BASE} from "../serial";
import * as ed from "@noble/ed25519";
import * as ethUtil from 'ethereumjs-util';
import {toBuffer} from "ethereumjs-util";


const BN = require('bn.js');

export const ecsign = (m:string, privateKey: Buffer):SignEL =>{
   const sign = signPrepareBlock(m,privateKey)
   return {
      r: sign.r,
      s: sign.s,
      v: getPublicKeyBs58(privateKey)
   }
}

export const ecrecover = (signEL:SignEL,h:string):string => {
   const s = toScalar(Buffer.from(signEL.s,"hex"));
   const R = ed.RistrettoPoint.fromHex(signEL.r);
   const sig:Signature = {
      s:s,
      R:R
   }
   const pb = fromAddressBytes(signEL.v);
   const m = toBuffer(h);
   if(verify(m,sig,pb)){
      return signEL.v
   }
   return "Invalid sig"
}

export interface Signature{
   s: bigint;
   R: ed.RistrettoPoint;
}

export const verify = (m:Buffer,sig:Signature,publicKey:Buffer)=>{
   const left = ED_BASE.multiply(sig.s);
   const pkHex = new BN(publicKey).toString("hex");
   const concatBuf = Buffer.concat([m, sig.R.toRawBytes()]);
   let hash = blake2bHash("EMIT-SIGN", concatBuf);
   const e = toScalar(hash.slice(0, 32));
   const right = ed.RistrettoPoint.fromHex(pkHex).multiply(e).add(sig.R)  ;//;new BN(mod(mod(toScalar() * e) + sig.R)).toArrayLike(Buffer, "le");
   return  left.equals(right);
}


export const personalSign = (privateKey: Buffer, msgParams:string):SignEL =>{
   const msgBuf = ethUtil.toBuffer(msgParams);
   const msgHash = ethUtil.hashPersonalMessage(msgBuf);
   const str = msgHash.toString("hex")
   return ecsign(str,privateKey)
}

export const recoverPersonalSignature = (sig:SignEL,msgHex:string): string =>{
   return ecrecover(sig,msgHex)
}
