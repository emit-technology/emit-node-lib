import {RistrettoPoint} from "@noble/ed25519";

export interface Signature {
    s: bigint;
    R: RistrettoPoint;
}

export interface SignEL {
    r: string
    s: string
    v: string
}