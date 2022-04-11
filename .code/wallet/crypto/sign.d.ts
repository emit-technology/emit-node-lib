/// <reference types="node" />
import { SignEL } from "../types/crypto";
import * as ed from "@noble/ed25519";
export declare const ecsign: (m: string, privateKey: Buffer) => SignEL;
export declare const ecrecover: (signEL: SignEL, h: string) => string;
export declare const toPoint: (rHex: string) => any;
export interface Signature {
    s: bigint;
    R: ed.RistrettoPoint;
}
export declare const verify: (m: Buffer, sig: Signature, publicKey: Buffer) => boolean;
