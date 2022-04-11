/// <reference types="node" />
import { Block, PrepareBlock, Sign } from "./types";
export declare function blake2bHash(personal: string, data: Buffer): Buffer;
export declare function prepareBlockToHash(prepareBlock: PrepareBlock): string;
export declare function blockToHash(block: Block): string;
export declare function toScalar(bytes: Uint8Array): bigint;
export declare function bytesToNumberLE(uint8a: Uint8Array): bigint;
export declare function mod(a: bigint, b?: bigint): bigint;
export declare function signPrepareBlock(h: string, privateKey: Buffer): Sign;
export interface MsgWithSign<T> {
    data: T;
    sign: SignWithAddress;
}
export interface SignWithAddress {
    addr: string;
    sign: Sign;
}
