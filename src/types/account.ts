export interface AccountModel {
    accountId?: string
    name?: string
    passwordHint?: string
    avatar?: string
    addresses?: { [chainType: number]: string } //{chainType:address}
    // createType: CreateType
    key?: string
    wallets?: { [chainType: number]: any }
    backedUp?: boolean
    timestamp?: number //create time
    password?: string
}

export enum CreateType {
    Mnemonic,
    PrivateKey,
}

export enum ChainType {
    _,
    SERO,
    ETH,
    TRON,
    BSC,
    EMIT
}