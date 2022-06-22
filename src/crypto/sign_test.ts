import {personalSign,ecrecover} from './sign';

// ecsign,ecrecover,
const key = "7b67dcc6de11e6a360bfa8a8856b8c8576529ee54c12bb715b207cd63c15b207";

const m = "0x64c2d1dab59dee2c7741acee3826dad50cdb7f6adb28a159b1bc6aa5374a2b24";


// const sig = ecsign(m,Buffer.from(key,'hex'));

const personMsg = personalSign(Buffer.from(key,'hex'),m)
console.log(personMsg);

const recover = ecrecover(personMsg,m)

console.log(recover);
