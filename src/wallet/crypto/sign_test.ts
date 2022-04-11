import {ecsign,ecrecover} from './sign';

const key = "7b67dcc6de11e6a360bfa8a8856b8c8576529ee54c12bb715b207cd63c15b207";

const m = "64c2d1dab59dee2c7741acee3826dad50cdb7f6adb28a159b1bc6aa5374a2b24";


const sig = ecsign(m,Buffer.from(key,'hex'));

console.log(sig);

const recover = ecrecover(sig,m)

console.log(recover);