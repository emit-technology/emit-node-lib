/// <reference types="node" />
import { SignEL } from "../types/crypto";
import * as ed from "@noble/ed25519";
export declare const ecsign: (m: string, privateKey: Buffer) => SignEL;
export declare const ecrecover: (signEL: SignEL, h: string) => string;
export interface Signature {
    s: bigint;
    R: ed.RistrettoPoint;
}
export declare const verify: (m: Buffer, sig: Signature, publicKey: Buffer) => boolean;
export declare const personalSign: (privateKey: Buffer, msgParams: string) => string;
export declare const recoverPersonalSignature: (sig: SignEL) => string;
export declare const hashPersonalMessage: (message: Buffer) => any;
