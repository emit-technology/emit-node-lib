"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_1 = require("./sign");
// ecsign,ecrecover,
const key = "7b67dcc6de11e6a360bfa8a8856b8c8576529ee54c12bb715b207cd63c15b207";
const m = "0x64c2d1dab59dee2c7741acee3826dad50cdb7f6adb28a159b1bc6aa5374a2b24";
// const sig = ecsign(m,Buffer.from(key,'hex'));
const personMsg = (0, sign_1.personalSign)(Buffer.from(key, 'hex'), m);
console.log(personMsg);
const recover = (0, sign_1.ecrecover)(personMsg, m);
console.log(recover);
//# sourceMappingURL=sign_test.js.map