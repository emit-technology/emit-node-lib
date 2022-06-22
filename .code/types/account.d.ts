export interface AccountModel {
    accountId?: string;
    name?: string;
    passwordHint?: string;
    avatar?: string;
    addresses?: {
        [chainType: number]: string;
    };
    key?: string;
    wallets?: {
        [chainType: number]: any;
    };
    backedUp?: boolean;
    timestamp?: number;
    password?: string;
}
export declare enum CreateType {
    Mnemonic = 0,
    PrivateKey = 1
}
export declare enum ChainType {
    _ = 0,
    SERO = 1,
    ETH = 2,
    TRON = 3,
    BSC = 4,
    EMIT = 5
}
