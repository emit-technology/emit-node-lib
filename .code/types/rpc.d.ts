import { BlockRef, OutFactor } from "./block";
export interface ConfirmedAccount {
    addr: string;
    blk_ref: BlockRef;
}
export interface SettleResp {
    factor: OutFactor;
    from_index_key: FromIndexKey;
    settled: boolean;
}
export interface FromIndexKey {
    from: string;
    num: number;
    index: number;
}
