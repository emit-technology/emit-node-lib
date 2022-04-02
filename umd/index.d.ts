// Generated by dts-bundle-generator v5.8.0

/// <reference types="node" />

import * as ed from '@noble/ed25519';

export declare function getPublicKeyBs58(privateKey: Buffer): string;
export declare function getPublicKey(privateKey: Buffer): Buffer;
export declare function fromAddressBytes(addr: string): Buffer;
export interface Block {
	num: number;
	timestamp: number;
	parent_hash: string;
	data_sets: Array<DataSet>;
	factor_set: FactorSet;
	data?: string;
}
export interface FactorSet {
	settles: Array<Settle>;
	outs: Array<Out>;
}
export interface Settle {
	from: string;
	num: number;
	index: number;
	factor: Factor;
}
export interface Factor {
	category: Category;
	value: string;
}
export interface Category {
	field: string;
	name: string;
}
export interface Out {
	target: string;
	factor: Factor;
}
export interface DataSet {
	name: string;
	data: string;
}
export interface PrepareBlock {
	address: string;
	blk: Block;
}
export interface Sign {
	r: string;
	s: string;
}
export declare function blake2b(personal: string, data: Buffer): Buffer;
export declare function prepareBlockToHash(prepareBlock: PrepareBlock): string;
export declare function blockToHash(block: Block): string;
export declare function toScalar(privateBytes: Uint8Array): bigint;
export declare function bytesToNumberLE(uint8a: Uint8Array): bigint;
export declare function signPrepareBlock(h: string, privateKey: Buffer): Sign;
export interface MsgWithSign<T> {
	data: T;
	sign: SignWithAddress;
}
export interface SignWithAddress {
	addr: string;
	sign: Sign;
}
export declare const BYTES_MAX_LEN: number;
export declare const VEC_T_MAX_LEN: number;
export declare const ADDRESS_BYTES_LEN = 36;
export declare const ADDRESS_BYTES_PREFIX = "1e";
export declare const EMIT_ADDR_BS_H0 = "EM_ADDR_BS_H0";
export declare const EMIT_ADDR_BS_H1 = "EM_ADDR_BS_H1";
export declare const ED_BASE: ed.RistrettoPoint;

export as namespace emitLib;

export {};