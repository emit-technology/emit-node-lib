import * as ed from "@noble/ed25519";

export interface Signature {
    s: bigint;
    R: ed.RistrettoPoint;
}

export interface SignEL {
    r: string
    s: string
    v: string
}