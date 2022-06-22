/// <reference types="node" />
export declare function getPublicKeyBs58(privateKey: Buffer): string;
export declare function getPublicKey(privateKey: Buffer): Buffer;
export declare function fromAddressBytes(addr: string): Buffer;
export declare function checkSumAddress(addr: string): boolean;
