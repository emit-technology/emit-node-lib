import {
  ADDRESS_BYTES_LEN,
  ADDRESS_BYTES_PREFIX,
  ED_BASE,
  EMIT_ADDR_BS_H0,
  EMIT_ADDR_BS_H1,
} from "./serial";
import { blake2b, toScalar } from "./sign";
const bs58 = require("bs58");

export function getPublicKeyBs58(privateKey: Buffer): string {
  const pk = privateKey.slice(0, 32);

  const pb = ED_BASE.multiply(toScalar(pk));
  const pubKey = Buffer.from(pb.toRistrettoBytes());

  const prefix = Buffer.from(ADDRESS_BYTES_PREFIX, "hex");
  const h0 = blake2b(EMIT_ADDR_BS_H0, Buffer.concat([prefix, pubKey]));
  const h0_r = Buffer.alloc(32, 0);
  h0_r.fill(h0, 0, h0.length > 32 ? 32 : h0.length);

  const h1 = blake2b(EMIT_ADDR_BS_H1, Buffer.concat([h0_r, pubKey]));
  const h1_r = Buffer.alloc(32, 0);
  h1_r.fill(h1, 0, h1.length > 32 ? 32 : h1.length);

  const r = Buffer.alloc(ADDRESS_BYTES_LEN, 0);
  const w = Buffer.concat([prefix, pubKey, h1_r.slice(0, 3)]);
  r.fill(w, 0, w.length > ADDRESS_BYTES_LEN ? ADDRESS_BYTES_LEN : w.length);
  return bs58.encode(r);
}

export function getPublicKey(privateKey: Buffer): Buffer {
  const sk = toScalar(privateKey.slice(0, 32));
  const pubKey = ED_BASE.multiply(sk).toRistrettoBytes();
  const buf = Buffer.alloc(32, 0);
  buf.fill(pubKey, 0, pubKey.length);
  return buf;
}

export function fromAddressBytes(addr: string): Buffer {
  const data: Buffer = bs58.decode(addr);
  if (data.length != ADDRESS_BYTES_LEN) {
    throw new Error("the address bytes len != 36");
  }
  if (data[0] != 0x1e) {
    throw new Error("the address prefix is invalid");
  }
  const h0 = blake2b(EMIT_ADDR_BS_H0, data.slice(0, 33));
  const h0_r = h0.slice(0, 32);
  const h1 = blake2b(EMIT_ADDR_BS_H1, Buffer.concat([h0_r, data.slice(1, 33)]));
  const h1_r = h1.slice(0, 32);
  if (data.slice(33).toString("hex") != h1_r.slice(0, 3).toString("hex")) {
    throw new Error("the address bytes sum-check failed");
  }
  return data.slice(1, 33);
}
