/// <reference types="node" />
import { Signature, SignEL } from "../types";
export declare const ecsign: (m: string, privateKey: Buffer) => SignEL;
export declare const ecrecover: (signEL: SignEL, h: string) => string;
export declare const verify: (m: Buffer, sig: Signature, publicKey: Buffer) => boolean;
export declare const personalSign: (privateKey: Buffer, msgParams: string) => SignEL;
export declare const hashPersonalMessage: (message: Buffer) => Buffer;
export declare const recoverPersonalSignature: (sig: SignEL, msgHex: string) => string;
